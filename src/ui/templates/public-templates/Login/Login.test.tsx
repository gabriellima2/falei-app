import "expo-router";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login } from "./Login";

import { ToastProvider } from "@/contexts/ToastContext";
import * as LoginState from "./hooks/use-login-state";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const useLoginStateSpy = jest.spyOn(LoginState, "useLoginState");

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<Login />
		</ToastProvider>
	);

describe("<Login />", () => {
	const mocks = {
		handleSignIn: jest.fn(),
	};

	const getButtonEl = () => screen.getByText("Entrar");
	const getPasswordFieldEl = () => screen.getByPlaceholderText("8+ Caracteres");
	const getEmailFieldEl = () =>
		screen.getByPlaceholderText("Ex: seuemail@gmail.com");

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(
				screen.getByText("Olá, novamente! Entre para continuar")
			).toBeTruthy();
			expect(getEmailFieldEl()).toBeTruthy();
			expect(getPasswordFieldEl()).toBeTruthy();
			expect(getButtonEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Submit", () => {
			const error = "any_message";
			const credentials = {
				email: "any@email.com",
				password: "any_password",
			};
			it("should handle the correctly when handle-sign-in is resolved", async () => {
				mocks.handleSignIn.mockResolvedValue({});
				useLoginStateSpy.mockReturnValue({ ...mocks });
				renderComponent();

				act(() => {
					fireEvent.changeText(getEmailFieldEl(), credentials.email);
					fireEvent.changeText(getPasswordFieldEl(), credentials.password);
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(mocks.handleSignIn).toHaveBeenCalledWith({
						email: credentials.email,
						password: credentials.password,
					});
				});
			});
			it("should handle the correctly when handle-sign-in is rejected", async () => {
				mocks.handleSignIn.mockRejectedValue(error);
				useLoginStateSpy.mockReturnValue({ ...mocks });
				renderComponent();

				await act(async () => {
					try {
						fireEvent.changeText(getEmailFieldEl(), credentials.email);
						fireEvent.changeText(getPasswordFieldEl(), credentials.password);
						fireEvent.press(getButtonEl());
					} catch (err) {
						await waitFor(() => {
							expect(mocks.handleSignIn).toHaveBeenCalledWith({
								email: credentials.email,
								password: credentials.password,
							});
							expect(screen.getByText(error)).toBeTruthy();
						});
					}
				});
			});
		});
	});
});
