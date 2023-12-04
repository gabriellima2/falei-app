import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount, type CreateAccountProps } from "./CreateAccount";
import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import {
	getFieldEl,
	placeholders,
} from "@/ui/components/AuthForm/AuthForm.test";

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
					expect(screen.getByText("Conta criada com sucesso")).toBeTruthy();
				});
			});
		});
	});
});
