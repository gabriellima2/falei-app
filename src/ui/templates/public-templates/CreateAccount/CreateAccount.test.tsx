import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount, type CreateAccountProps } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockClearNavigation, mockReplace } from "jest-setup";

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
	const getAnonymousButtonEl = () => screen.getByText("Continuar sem conta");

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
				it("should handle anonymous when is resolved", async () => {
					renderComponent();

					act(() => {
						fireEvent.press(getAnonymousButtonEl());
					});

					await waitFor(() => {
						expect(defaultProps.anonymous).toHaveBeenCalled();
						expect(mockReplace).toHaveBeenCalledWith("(tabs)/");
						expect(mockClearNavigation).toHaveBeenCalled();
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
					} catch (err) {
						await waitFor(() => {
							expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
							expect(defaultProps.anonymous).toHaveBeenCalled();
							expect(mockReplace).not.toHaveBeenCalled();
							expect(mockClearNavigation).not.toHaveBeenCalled();
						});
					}
				});
			});
		});
	});
});
