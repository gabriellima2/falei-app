import "expo-router";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login } from "./Login";
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
			<Login />
		</ToastProvider>
	);

describe("<Login />", () => {
	const ERROR_MESSAGE = "any_error";
	const mocks = {
		signIn: jest.fn(),
	};

	const getButtonEl = () => screen.getByText("Entrar");
	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getButtonEl()).toBeTruthy();
			expect(
				screen.getByText("Olá, novamente! Entre para continuar")
			).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("SignIn", () => {
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

			it("should handle the sign-in service when is resolved", async () => {
				mocks.signIn.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				act(() => {
					fillFormFields();
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(mocks.signIn).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
				});
			});
			it("should handle the sign-in service when is rejected", async () => {
				mocks.signIn.mockRejectedValue(ERROR_MESSAGE);
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				renderComponent();

				try {
					act(() => {
						fillFormFields();
						fireEvent.press(getButtonEl());
					});
				} catch (err) {
					await waitFor(() => {
						expect(mocks.signIn).toHaveBeenCalledWith({
							email: values.email,
							password: values.password,
						});
						expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
					});
				}
			});
		});
	});
});
