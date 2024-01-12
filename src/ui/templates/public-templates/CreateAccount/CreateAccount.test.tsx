import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<CreateAccount />
		</ToastProvider>
	);

describe("<CreateAccount />", () => {
	const ERROR_MESSAGE = "any_message";
	const mocks = {
		anonymous: jest.fn(),
		signUp: jest.fn(),
	};

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
				mocks.signUp.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				act(() => {
					fillFormFields();
					fireEvent.press(getCreateAccountButtonEl());
				});

				await waitFor(() => {
					expect(mocks.signUp).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
					expect(screen.getByText("Conta criada com sucesso")).toBeTruthy();
				});
			});
			it("should handle the sign-up service when is rejected", async () => {
				mocks.signUp.mockRejectedValue(ERROR_MESSAGE);
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				try {
					act(() => {
						fillFormFields();
						fireEvent.press(getCreateAccountButtonEl());
					});
				} catch (err) {
					await waitFor(() => {
						expect(mocks.signUp).toHaveBeenCalledWith({
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
				mocks.anonymous.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				act(() => {
					fireEvent.press(getAnonymousButtonEl());
				});

				expectAnonymousButtonToHaveState({ disabled: true });
				await waitFor(() => {
					expect(mocks.anonymous).toHaveBeenCalled();
					expectAnonymousButtonToHaveState({ disabled: false });
				});
			});
			it("should handle the sign-in-anonymously service when is rejected", async () => {
				mocks.anonymous.mockRejectedValue(ERROR_MESSAGE);
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				try {
					act(() => {
						fireEvent.press(getAnonymousButtonEl());
					});
					expectAnonymousButtonToHaveState({ disabled: true });
				} catch (err) {
					await waitFor(() => {
						expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
						expect(mocks.anonymous).toHaveBeenCalled();
						expectAnonymousButtonToHaveState({ disabled: false });
					});
				}
			});
		});
	});
});
