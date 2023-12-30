import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount, type CreateAccountProps } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockRedirect } from "jest-setup";

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
			it("should create account correctly", async () => {
				const placeholders = {
					email: "Ex: seuemail@gmail.com",
					password: "8+ Caracteres",
				};
				const values = {
					email: "test@example.com",
					password: "password123",
				};
				renderComponent();

				act(() => {
					fireEvent.changeText(getFieldEl(placeholders.email), values.email);
					fireEvent.changeText(
						getFieldEl(placeholders.password),
						values.password
					);
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
			describe("Anonymous", () => {
				function expectAnonymousButtonToHaveState(state: {
					disabled: boolean;
				}) {
					expect(getAnonymousButtonEl().props.accessibilityState.disabled).toBe(
						state.disabled
					);
				}

				it("should handle anonymous when is resolved", async () => {
					renderComponent();

					act(() => {
						fireEvent.press(getAnonymousButtonEl());
					});

					expectAnonymousButtonToHaveState({ disabled: true });
					await waitFor(() => {
						expect(defaultProps.anonymous).toHaveBeenCalled();
						expect(mockRedirect).toHaveBeenCalled();
						expectAnonymousButtonToHaveState({ disabled: false });
					});
				});
				it("should handle anonymous when is rejected", async () => {
					const ERROR_MESSAGE = "any_message";
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
							expect(mockRedirect).not.toHaveBeenCalled();
							expectAnonymousButtonToHaveState({ disabled: false });
						});
					}
				});
			});
		});
	});
});
