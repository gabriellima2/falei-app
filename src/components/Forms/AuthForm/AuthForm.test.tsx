import { screen, waitFor } from "@testing-library/react-native";

import { AuthForm, type AuthFormProps } from "./AuthForm";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { simulateFormSubmit } from "@/__mocks__/simulate-form-submit";
import { asyncFunctions } from "@/__mocks__/async-functions";

type Fields = { email: string; password: string };

const fields: (keyof Fields)[] = ["email", "password"];
const placeholders: Fields = {
	email: "Ex: seuemail@gmail.com",
	password: "8+ Caracteres",
};
const labels: Fields = {
	email: "Email",
	password: "Senha",
};
const validValues: Fields = {
	email: "any@email.com",
	password: "any_password",
};
const defaultProps: AuthFormProps = {
	title: "any_title",
	button: { text: "any_button_text" },
	onSubmit: asyncFunctions.resolved,
};

const renderComponent = (props: AuthFormProps = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<AuthForm {...props} />
		</ToastProvider>
	);

const getErrorEls = () => screen.queryAllByRole("alert");
const getButtonEl = () => screen.getByText(defaultProps.button.text);
const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

describe("<AuthForm />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();
			const { title, button } = defaultProps;

			expect(screen.getByText(title));
			expect(screen.getByText(button.text));
			expect(screen.getByText(labels.email));
			expect(screen.getByText(labels.password));
			expect(getFieldEl(placeholders.email));
			expect(getFieldEl(placeholders.password));
		});
	});
	describe("Validations", () => {
		type ExpectHasErrorOnSubmittingParams = {
			errorIndex: number;
			errorMessage: string;
			onSubmit: typeof defaultProps.onSubmit;
		};

		function expectHasErrorOnSubmitting(
			params: ExpectHasErrorOnSubmittingParams
		) {
			const { errorMessage, errorIndex, onSubmit } = params;
			const errorEl = getErrorEls()[errorIndex];
			expect(errorEl.props.children).toContain(errorMessage);
			expect(onSubmit).not.toHaveBeenCalled();
		}

		test.each(fields)(
			"should show an error message when submitting with empty %s",
			async (field) => {
				renderComponent();
				const { onSubmit } = defaultProps;

				simulateFormSubmit({
					fields: [
						{
							el: getFieldEl(placeholders[field]),
							value: "",
						},
					],
					buttonEl: getButtonEl(),
				});

				await waitFor(() => {
					expectHasErrorOnSubmitting({
						errorIndex: fields.indexOf(field),
						errorMessage: "obrigatório",
						onSubmit,
					});
				});
			}
		);
		test.each(fields)(
			"should show an error message when submitting with invalid %s",
			async (field) => {
				const invalidValues: Fields = {
					email: "invalid_email.com",
					password: "1234567",
				};
				const errorMessages: Fields = {
					email: "email inválido",
					password: "8 ou mais caracteres",
				};
				renderComponent();
				const { onSubmit } = defaultProps;

				simulateFormSubmit({
					fields: [
						{
							el: getFieldEl(placeholders[field]),
							value: invalidValues[field],
						},
					],
					buttonEl: getButtonEl(),
				});

				await waitFor(() => {
					expectHasErrorOnSubmitting({
						errorIndex: fields.indexOf(field),
						errorMessage: errorMessages[field],
						onSubmit,
					});
				});
			}
		);
		test.each(fields)(
			"should not show errors when submitting with valid %s",
			async (field) => {
				renderComponent();

				simulateFormSubmit({
					fields: [
						{
							el: getFieldEl(placeholders[field]),
							value: validValues[field],
						},
					],
					buttonEl: getButtonEl(),
				});

				await waitFor(() => {
					expect(getErrorEls()[fields.indexOf(field)]).toBeFalsy();
				});
			}
		);
	});
	describe("Submit", () => {
		const user = {
			email: validValues.email,
			password: validValues.password,
		};

		function submitCorrectly() {
			simulateFormSubmit({
				fields: [
					{
						el: getFieldEl(placeholders.email),
						value: user.email,
					},
					{
						el: getFieldEl(placeholders.password),
						value: user.password,
					},
				],
				buttonEl: getButtonEl(),
			});
		}

		it("should call the onSubmit function correctly when submitting", async () => {
			renderComponent();
			const { onSubmit } = defaultProps;

			submitCorrectly();

			await waitFor(() => {
				expect(getErrorEls()[0]).toBeFalsy();
				expect(getErrorEls()[1]).toBeFalsy();
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(user));
				expect(screen.getByLabelText("Carregando...")).toBeTruthy();
			});
		});
		it("should show an error toast when onSubmit function throw an error", async () => {
			const ERROR_MESSAGE = "any_error";
			renderComponent({
				...defaultProps,
				onSubmit: asyncFunctions.rejected(ERROR_MESSAGE),
			});

			submitCorrectly();

			await waitFor(() => {
				expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
			});
		});
	});
});
