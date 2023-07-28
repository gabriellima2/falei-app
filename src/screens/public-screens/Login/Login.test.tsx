import "expo-router";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login, type LoginProps } from "./Login";

import { mockReplace } from "jest-setup";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import {
	getFieldEl,
	placeholders,
} from "@/components/Forms/AuthForm/AuthForm.test";

const defaultProps: LoginProps<null> = {
	authentication: jest.fn(),
};

const renderComponent = () =>
	renderWithThemeProvider(<Login {...defaultProps} />);

const getButtonEl = () => screen.getByText("Entrar");

describe("<Login />", () => {
	afterAll(() => {
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
					fireEvent.changeText(getFieldEl(placeholders.email), emailValue);
					fireEvent.changeText(
						getFieldEl(placeholders.password),
						passwordValue
					);
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(defaultProps.authentication).toHaveBeenCalledWith({
						email: emailValue,
						password: passwordValue,
					});
					expect(mockReplace).toHaveBeenCalledWith("(tabs)/");
				});
			});
		});
	});
});
