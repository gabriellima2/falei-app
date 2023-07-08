import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { AuthForm, type AuthFormProps } from "./AuthForm";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const FORM_EMAIL_LABEL = "Email";
const FORM_PASSWORD_LABEL = "Senha";
const FORM_EMAIL_PLACEHOLDER = "Ex: seuemail@gmail.com";
const FORM_PASSWORD_PLACEHOLDER = "8+ Caracteres";

const defaultProps: AuthFormProps = {
	title: "any_title",
	button: { text: "any_button_text" },
	onSubmit: jest.fn(),
};

const renderComponent = () =>
	renderWithThemeProvider(<AuthForm {...defaultProps} />);

describe("<AuthForm />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();
			const { title, button } = defaultProps;

			expect(screen.getByText(title));
			expect(screen.getByText(button.text));
			expect(screen.getByText(FORM_EMAIL_LABEL));
			expect(screen.getByText(FORM_PASSWORD_LABEL));
			expect(screen.getByPlaceholderText(FORM_EMAIL_PLACEHOLDER));
			expect(screen.getByPlaceholderText(FORM_PASSWORD_PLACEHOLDER));
		});
	});
	describe("Validations", () => {
		const INVALID_EMAIL = "invalid_email.com";
		const INVALID_PASSWORD = "1234567";
		const DEFAULT_WORD_FOR_REQUIRED_FIELD = "obrigatório";
		const DEFAULT_WORD_FOR_INVALID_EMAIL = "email inválido";
		const DEFAULT_WORD_FOR_INVALID_PASSWORD = "8 ou mais caracteres";

		const getErrorEls = () => screen.getAllByRole("alert");
		const getSubmitButtonEl = () => screen.getByText(defaultProps.button.text);
		const getEmailFieldEl = () =>
			screen.getByPlaceholderText(FORM_EMAIL_PLACEHOLDER);
		const getPasswordFieldEl = () =>
			screen.getByPlaceholderText(FORM_PASSWORD_PLACEHOLDER);

		describe("Email", () => {
			it("should show an error message when submitting with empty email", async () => {
				renderComponent();
				const { onSubmit } = defaultProps;

				act(() => {
					fireEvent.changeText(getEmailFieldEl(), "");
					fireEvent.press(getSubmitButtonEl());
				});

				await waitFor(() => {
					const error = getErrorEls()[0];
					expect(error.props.children).toContain(
						DEFAULT_WORD_FOR_REQUIRED_FIELD
					);
					expect(onSubmit).not.toHaveBeenCalled();
				});
			});
			it("should show an error message when submitting with invalid email", async () => {
				renderComponent();
				const { onSubmit } = defaultProps;

				act(() => {
					fireEvent.changeText(getEmailFieldEl(), INVALID_EMAIL);
					fireEvent.press(getSubmitButtonEl());
				});

				await waitFor(() => {
					const error = getErrorEls()[0];
					expect(error.props.children).toContain(
						DEFAULT_WORD_FOR_INVALID_EMAIL
					);
					expect(onSubmit).not.toHaveBeenCalled();
				});
			});
			describe("Password", () => {
				it("should show an error message when submitting with empty password", async () => {
					renderComponent();
					const { onSubmit } = defaultProps;

					act(() => {
						fireEvent.changeText(getPasswordFieldEl(), "");
						fireEvent.press(getSubmitButtonEl());
					});

					await waitFor(() => {
						const error = getErrorEls()[1];
						expect(error.props.children).toContain(
							DEFAULT_WORD_FOR_REQUIRED_FIELD
						);
						expect(onSubmit).not.toHaveBeenCalled();
					});
				});
				it("should show an error message when submitting with password less than 8 chars", async () => {
					renderComponent();
					const { onSubmit } = defaultProps;

					act(() => {
						fireEvent.changeText(getPasswordFieldEl(), INVALID_PASSWORD);
						fireEvent.press(getSubmitButtonEl());
					});

					await waitFor(() => {
						const error = getErrorEls()[1];
						expect(error.props.children).toContain(
							DEFAULT_WORD_FOR_INVALID_PASSWORD
						);
						expect(onSubmit).not.toHaveBeenCalled();
					});
				});
			});
			describe("Both", () => {
				it("should show error messages when submitting with empty fields", async () => {
					renderComponent();
					const { onSubmit } = defaultProps;

					act(() => {
						fireEvent.changeText(getEmailFieldEl(), "");
						fireEvent.changeText(getPasswordFieldEl(), "");
						fireEvent.press(getSubmitButtonEl());
					});

					await waitFor(() => {
						const emailError = getErrorEls()[0];
						const passwordError = getErrorEls()[1];
						expect(emailError.props.children).toContain(
							DEFAULT_WORD_FOR_REQUIRED_FIELD
						);
						expect(passwordError.props.children).toContain(
							DEFAULT_WORD_FOR_REQUIRED_FIELD
						);
						expect(onSubmit).not.toHaveBeenCalled();
					});
				});
				it("should show error messages when submitting with invalid fields", async () => {
					renderComponent();
					const { onSubmit } = defaultProps;

					act(() => {
						fireEvent.changeText(getEmailFieldEl(), INVALID_EMAIL);
						fireEvent.changeText(getPasswordFieldEl(), INVALID_PASSWORD);
						fireEvent.press(getSubmitButtonEl());
					});

					await waitFor(() => {
						const emailError = getErrorEls()[0];
						const passwordError = getErrorEls()[1];
						expect(emailError.props.children).toContain(
							DEFAULT_WORD_FOR_INVALID_EMAIL
						);
						expect(passwordError.props.children).toContain(
							DEFAULT_WORD_FOR_INVALID_PASSWORD
						);
						expect(onSubmit).not.toHaveBeenCalled();
					});
				});
			});
		});
	});
});
