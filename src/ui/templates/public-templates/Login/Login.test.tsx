import "expo-router";
import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";

import { Login, type LoginProps } from "./Login";
import * as useClearNavigation from "@/hooks/use-clear-navigation";

import { mockReplace } from "jest-setup";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const useClearNavigationSpyOn = jest.spyOn(
	useClearNavigation,
	"useClearNavigation"
);

const mockClearNavigation = jest.fn();
const defaultProps: LoginProps<null> = {
	authentication: jest.fn(),
};

const renderComponent = () =>
	renderWithThemeProvider(<Login {...defaultProps} />);

const getButtonEl = () => screen.getByText("Entrar");

describe("<Login />", () => {
	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

	beforeAll(() => {
		useClearNavigationSpyOn.mockReturnValue(mockClearNavigation);
	});

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
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(defaultProps.authentication).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
					expect(mockReplace).toHaveBeenCalledWith("(tabs)/");
					expect(mockClearNavigation).toHaveBeenCalled();
				});
			});
		});
	});
});