import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount } from "./CreateAccount";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { mockFirebaseAuth } from "jest-setup";
import {
	getFieldEl,
	placeholders,
} from "@/components/Forms/AuthForm/AuthForm.test";
import { ToastProvider } from "@/contexts/ToastContext";

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<CreateAccount />
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
					expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
						mockFirebaseAuth,
						emailValue,
						passwordValue
					);
					expect(screen.getByText("Conta criada com sucesso")).toBeTruthy();
				});
			});
		});
	});
});
