import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount, type CreateAccountProps } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const defaultProps: CreateAccountProps = {
	signUp: jest.fn(),
	anonymous: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<CreateAccount {...props} />
		</ToastProvider>
	);

describe("<CreateAccount />", () => {
	const ERROR_MESSAGE = "any_message";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);
	const getCreateAccountButtonEl = () => screen.getByText("Criar conta");
	const getAnonymousButtonEl = () =>
		screen.getByLabelText("Continuar sem conta");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getCreateAccountButtonEl()).toBeTruthy();
			expect(getAnonymousButtonEl()).toBeTruthy();
			expect(
				screen.getByText("Bem-vindo! Crie uma conta para continuar")
			).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("SignUp", () => {
			const values = {
				email: "test@example.com",
				password: "password123",
			};

			function fillFormFields() {
				fireEvent.changeText(
					getFieldEl("Ex: seuemail@gmail.com"),
					values.email
				);
				fireEvent.changeText(getFieldEl("8+ Caracteres"), values.password);
			}

			it("should handle the sign-up service when is resolved", async () => {
				renderComponent();

				act(() => {
					fillFormFields();
					fireEvent.press(getCreateAccountButtonEl());
				});

				await waitFor(() => {
					expect(defaultProps.signUp).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
					expect(screen.getByText("Conta criada com sucesso")).toBeTruthy();
				});
			});
			it("should handle the sign-up service when is rejected", async () => {
				renderComponent({
					...defaultProps,
					signUp: jest.fn().mockRejectedValue(ERROR_MESSAGE),
				});

				try {
					act(() => {
						fillFormFields();
						fireEvent.press(getCreateAccountButtonEl());
					});
				} catch (err) {
					await waitFor(() => {
						expect(defaultProps.signUp).toHaveBeenCalledWith({
							email: values.email,
							password: values.password,
						});
						expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
					});
				}
			});
		});
		describe("Anonymous", () => {
			function expectAnonymousButtonToHaveState(state: { disabled: boolean }) {
				expect(getAnonymousButtonEl().props.accessibilityState.disabled).toBe(
					state.disabled
				);
			}

			it("should handle the sign-in-anonymously service when is resolved", async () => {
				renderComponent();

				act(() => {
					fireEvent.press(getAnonymousButtonEl());
				});

				expectAnonymousButtonToHaveState({ disabled: true });
				await waitFor(() => {
					expect(defaultProps.anonymous).toHaveBeenCalled();
					expectAnonymousButtonToHaveState({ disabled: false });
				});
			});
			it("should handle the sign-in-anonymously service when is rejected", async () => {
				renderComponent({
					...defaultProps,
					anonymous: jest.fn().mockRejectedValue(ERROR_MESSAGE),
				});

				try {
					act(() => {
						fireEvent.press(getAnonymousButtonEl());
					});
					expectAnonymousButtonToHaveState({ disabled: true });
				} catch (err) {
					await waitFor(() => {
						expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
						expect(defaultProps.anonymous).toHaveBeenCalled();
						expectAnonymousButtonToHaveState({ disabled: false });
					});
				}
			});
		});
	});
});
