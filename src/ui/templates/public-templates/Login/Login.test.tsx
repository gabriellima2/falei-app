import "expo-router";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login, type LoginProps } from "./Login";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const defaultProps: LoginProps = {
	signIn: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<Login {...props} />
		</ToastProvider>
	);

describe("<Login />", () => {
	const ERROR_MESSAGE = "any_error";

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
				renderComponent();

				act(() => {
					fillFormFields();
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(defaultProps.signIn).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
				});
			});
			it("should handle the sign-in service when is rejected", async () => {
				renderComponent({
					...defaultProps,
					signIn: jest.fn().mockRejectedValue(ERROR_MESSAGE),
				});

				try {
					act(() => {
						fillFormFields();
						fireEvent.press(getButtonEl());
					});
				} catch (err) {
					await waitFor(() => {
						expect(defaultProps.signIn).toHaveBeenCalledWith({
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
