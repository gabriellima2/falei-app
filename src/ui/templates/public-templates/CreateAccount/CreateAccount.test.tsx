import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount, type CreateAccountProps } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: CreateAccountProps<null> = {
	authentication: jest.fn(),
};

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<CreateAccount {...defaultProps} />
		</ToastProvider>
	);

const getButtonEl = () => screen.getByText("Criar conta");

describe("<CreateAccount />", () => {
	const getFieldEl = (text: string) => screen.getByPlaceholderText(text);

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getButtonEl()).toBeTruthy();
			expect(screen.getByText("Continuar sem conta")).toBeTruthy();
			expect(
				screen.getByText("Bem-vindo! Crie uma conta para continuar")
			).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Submit", () => {
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
					fireEvent.press(getButtonEl());
				});

				await waitFor(() => {
					expect(defaultProps.authentication).toHaveBeenCalledWith({
						email: values.email,
						password: values.password,
					});
					expect(screen.getByText("Conta criada com sucesso")).toBeTruthy();
				});
			});
		});
	});
});
