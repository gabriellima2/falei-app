import { screen, waitFor } from "@testing-library/react-native";

import { SendEmailForm, type SendEmailFormProps } from "./SendEmailForm";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { simulateFormSubmit } from "@/__mocks__/simulate-form-submit";

const defaultProps: SendEmailFormProps = { resetPasswordService: jest.fn() };

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<SendEmailForm {...props} />
		</ToastProvider>
	);

describe("<SendEmailForm />", () => {
	const placeholder = { email: "Ex: seuemail@gmail.com" };

	const getEmailFieldEl = () => screen.getByLabelText("Email");
	const getSubmitButton = () =>
		screen.getByLabelText("Prosseguir com a redefinição de senha");

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Continuar")).toBeTruthy();
			expect(getSubmitButton()).toBeTruthy();
			expect(getEmailFieldEl()).toBeTruthy();
			expect(screen.getByPlaceholderText(placeholder.email)).toBeTruthy();
		});
	});
	describe("Validations", () => {
		const messages = {
			email: {
				required: "O campo email é obrigatório",
				invalid: "Formato de email inválido",
			},
		};

		it("should show an error message when submitting with empty email", async () => {
			renderComponent();

			simulateFormSubmit({
				fields: [{ el: getEmailFieldEl(), value: "" }],
				buttonEl: getSubmitButton(),
			});

			await waitFor(() => {
				expect(screen.getByRole("alert")).toBeTruthy();
				expect(screen.getByText(messages.email.required)).toBeTruthy();
				expect(defaultProps.resetPasswordService).not.toHaveBeenCalled();
			});
		});
		it("should show an error message when submitting with invalid email", async () => {
			renderComponent();

			simulateFormSubmit({
				fields: [{ el: getEmailFieldEl(), value: "email.com" }],
				buttonEl: getSubmitButton(),
			});

			await waitFor(() => {
				expect(screen.getByRole("alert")).toBeTruthy();
				expect(screen.getByText(messages.email.invalid)).toBeTruthy();
				expect(defaultProps.resetPasswordService).not.toHaveBeenCalled();
			});
		});
	});
	describe("Interactions", () => {
		describe("Submit", () => {
			const email = "any_email@domain.com";
			it("should handle correctly when reset-password-service is resolved when submit", async () => {
				(defaultProps.resetPasswordService as jest.Mock).mockResolvedValue({});
				renderComponent();

				simulateFormSubmit({
					fields: [{ el: getEmailFieldEl(), value: email }],
					buttonEl: getSubmitButton(),
				});

				expect(screen.getByLabelText("Carregando...")).toBeTruthy();
				await waitFor(() => {
					expect(screen.queryByRole("alert")).toBeFalsy();
					expect(defaultProps.resetPasswordService).toHaveBeenCalled();
					expect(defaultProps.resetPasswordService).toHaveBeenCalledWith({
						email,
					});
				});
			});
			it("should handle correctly when reset-password-service is rejected when submit", async () => {
				const ERROR_MESSAGE = "any_message";
				(defaultProps.resetPasswordService as jest.Mock).mockRejectedValue(
					new Error(ERROR_MESSAGE)
				);
				renderComponent();

				simulateFormSubmit({
					fields: [{ el: getEmailFieldEl(), value: email }],
					buttonEl: getSubmitButton(),
				});

				expect(screen.getByLabelText("Carregando...")).toBeTruthy();
				await waitFor(() => {
					expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
					expect(defaultProps.resetPasswordService).toHaveBeenCalled();
				});
			});
		});
	});
});
