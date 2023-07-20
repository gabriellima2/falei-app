import "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login } from "./Login";

import { mockFirebaseAuth, mockReplace } from "jest-setup";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const getEmailFieldEl = () =>
	screen.getByPlaceholderText("Ex: seuemail@gmail.com");
const getPasswordFieldEl = () => screen.getByPlaceholderText("8+ Caracteres");
const getButtonEl = () => screen.getByText("Entrar");
const renderComponent = () => renderWithThemeProvider(<Login />);

describe("<Login />", () => {
	afterEach(() => {
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
		describe("Submit", () => {
			it("should login the user correctly", async () => {
				const emailValue = "test@example.com";
				const passwordValue = "password123";
				renderComponent();

				act(() => {
					fireEvent.changeText(getEmailFieldEl(), emailValue);
					fireEvent.changeText(getPasswordFieldEl(), passwordValue);
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
						mockFirebaseAuth,
						emailValue,
						passwordValue
					);
					expect(mockReplace).toHaveBeenCalledWith("(tabs)/");
				});
			});
		});
	});
});
