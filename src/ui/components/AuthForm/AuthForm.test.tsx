import { screen, waitFor } from "@testing-library/react-native";

import { AuthForm, type AuthFormProps } from "./AuthForm";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { simulateFormSubmit } from "@/__mocks__/simulate-form-submit";

type Fields = { email: string; password: string };

const defaultProps: AuthFormProps = {
	title: "any_title",
	button: { text: "any_button_text" },
	authenticationService: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
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
	const getSubmitButtonEl = () => screen.getByText(defaultProps.button.text);
	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();
			const { title, button } = defaultProps;

			expect(screen.getByText(title)).toBeTruthy();
			expect(screen.getByText(button.text)).toBeTruthy();
			expect(screen.getByText(labels.email)).toBeTruthy();
			expect(screen.getByText(labels.password)).toBeTruthy();
			expect(getFieldEl(placeholders.email)).toBeTruthy();
			expect(getFieldEl(placeholders.password)).toBeTruthy();
		});
	});
	describe("Validations", () => {
		const messages = {
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
					fields: [{ el: getFieldEl(placeholders[field]), value: "" }],
					buttonEl: getSubmitButtonEl(),
				});

				await waitFor(() => {
					expectHasErrorOnSubmit({
						errorIndex: fields.indexOf(field),
						errorMessage: messages[field].required,
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
						{ el: getFieldEl(placeholders[field]), value: values[field] },
					],
					buttonEl: getSubmitButtonEl(),
				});

				await waitFor(() => {
					expectHasErrorOnSubmit({
						errorIndex: fields.indexOf(field),
						errorMessage: messages[field].invalid,
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
						{ el: getFieldEl(placeholders[field]), value: values[field] },
					],
					buttonEl: getSubmitButtonEl(),
				});

				await waitFor(() => {
					expect(getErrorEls()[fields.indexOf(field)]).toBeFalsy();
				});
			}
		);
	});
	describe("Submit", () => {
		const credentials = {
			email: "any@email.com",
			password: "any_password",
		};

		it("should handle correctly when authentication-service is resolved when submit", async () => {
			(defaultProps.authenticationService as jest.Mock).mockResolvedValue({});
			renderComponent();

			const emailEl = getFieldEl(placeholders.email);
			const passwordEl = getFieldEl(placeholders.password);

			simulateFormSubmit({
				fields: [
					{ el: emailEl, value: credentials.email },
					{ el: passwordEl, value: credentials.password },
				],
				buttonEl: getSubmitButtonEl(),
			});

			expect(screen.getByLabelText("Carregando...")).toBeTruthy();
			await waitFor(() => {
				const [emailError, passwordError] = getErrorEls();
				expect(emailError).toBeFalsy();
				expect(passwordError).toBeFalsy();
				expect(defaultProps.authenticationService).toHaveBeenCalled();
				expect(defaultProps.authenticationService).toHaveBeenCalledWith(
					expect.objectContaining(credentials)
				);
			});
		});
		it("should handle correctly when authentication-service is rejected when submit", async () => {
			const ERROR_MESSAGE = "any_message";
			(defaultProps.authenticationService as jest.Mock).mockRejectedValue(
				new Error(ERROR_MESSAGE)
			);
			renderComponent();

			const emailEl = getFieldEl(placeholders.email);
			const passwordEl = getFieldEl(placeholders.password);

			simulateFormSubmit({
				fields: [
					{ el: emailEl, value: credentials.email },
					{ el: passwordEl, value: credentials.password },
				],
				buttonEl: getSubmitButtonEl(),
			});

			await waitFor(() => {
				const [emailError, passwordError] = getErrorEls();
				expect(emailError).toBeFalsy();
				expect(passwordError).toBeFalsy();
				expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
				expect(defaultProps.authenticationService).toHaveBeenCalled();
			});
		});
	});
});
