import { screen, waitFor } from "@testing-library/react-native";

import { AuthForm, type AuthFormProps } from "./AuthForm";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { simulateFormSubmit } from "@/__mocks__/simulate-form-submit";
import { asyncFunctions } from "@/__mocks__/async-functions";

type Fields = { email: string; password: string };

const defaultProps: AuthFormProps = {
	title: "any_title",
	button: { text: "any_button_text" },
	authenticationService: asyncFunctions.resolved,
};

const renderComponent = (props: AuthFormProps = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<AuthForm {...props} />
		</ToastProvider>
	);

describe("<AuthForm />", () => {
	const fields: (keyof Fields)[] = ["email", "password"];
	const placeholders: Fields = {
		email: "Ex: seuemail@gmail.com",
		password: "8+ Caracteres",
	};
	const labels: Fields = {
		email: "Email",
		password: "Senha",
	};

	const getErrorEls = () => screen.queryAllByRole("alert");
	const getButtonEl = () => screen.getByText(defaultProps.button.text);
	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

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
		const ERROR_MESSAGES = {
			email: {
				required: "O campo email é obrigatório",
				invalid: "email inválido",
			},
			password: {
				required: "Digite uma senha com 8 ou mais caracteres",
				invalid: "Digite uma senha com 8 ou mais caracteres",
			},
		};

		function expectHasErrorOnSubmit(params: {
			errorIndex: number;
			errorMessage: string;
			authenticationService: typeof defaultProps.authenticationService;
		}) {
			const { errorMessage, errorIndex, authenticationService } = params;
			const errorEl = getErrorEls()[errorIndex];
			expect(errorEl.props.children).toContain(errorMessage);
			expect(authenticationService).not.toHaveBeenCalled();
		}

		test.each(fields)(
			"should show an error message when submitting with empty %s",
			async (field) => {
				renderComponent();
				const { authenticationService } = defaultProps;

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
					expectHasErrorOnSubmit({
						errorIndex: fields.indexOf(field),
						errorMessage: ERROR_MESSAGES[field].required,
						authenticationService,
					});
				});
			}
		);
		test.each(fields)(
			"should show an error message when submitting with invalid %s",
			async (field) => {
				const values: Fields = {
					email: "invalid_email.com",
					password: "1234567",
				};
				renderComponent();
				const { authenticationService } = defaultProps;

				simulateFormSubmit({
					fields: [
						{
							el: getFieldEl(placeholders[field]),
							value: values[field],
						},
					],
					buttonEl: getButtonEl(),
				});

				await waitFor(() => {
					expectHasErrorOnSubmit({
						errorIndex: fields.indexOf(field),
						errorMessage: ERROR_MESSAGES[field].invalid,
						authenticationService,
					});
				});
			}
		);
		test.each(fields)(
			"should not show errors when submitting with valid %s",
			async (field) => {
				const values: Fields = {
					email: "any@email.com",
					password: "any_password",
				};
				renderComponent();

				simulateFormSubmit({
					fields: [
						{
							el: getFieldEl(placeholders[field]),
							value: values[field],
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
			email: "any@email.com",
			password: "any_password",
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

		it("should call the authenticationService function correctly when submitting", async () => {
			renderComponent();
			const { authenticationService } = defaultProps;

			submitCorrectly();

			await waitFor(() => {
				expect(getErrorEls()[0]).toBeFalsy();
				expect(getErrorEls()[1]).toBeFalsy();
				expect(authenticationService).toHaveBeenCalledTimes(1);
				expect(authenticationService).toHaveBeenCalledWith(
					expect.objectContaining(user)
				);
				expect(screen.getByLabelText("Carregando...")).toBeTruthy();
			});
		});
		it("should show an error toast when authenticationService function throw an error", async () => {
			const ERROR_MESSAGE = "any_error";
			renderComponent({
				...defaultProps,
				authenticationService: asyncFunctions.rejected(ERROR_MESSAGE),
			});

			submitCorrectly();

			await waitFor(() => {
				expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
			});
		});
	});
});
