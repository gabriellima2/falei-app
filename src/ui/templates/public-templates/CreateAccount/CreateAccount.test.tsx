import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { CreateAccount } from "./CreateAccount";
import * as CreateAccountState from "./hooks/use-create-account-state";

import { ToastProvider } from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { mockRedirect } from "jest-setup";

import type { UserEntity } from "@/entities/user.entity";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const useCreateAccountStateSpy = jest.spyOn(
	CreateAccountState,
	"useCreateAccountState"
);

beforeEach(() => {
	jest.clearAllMocks();
});

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<CreateAccount />
		</ToastProvider>
	);

describe("<CreateAccount />", () => {
	const mocks = {
		user: null,
		wasAnonymousAuthUsed: false,
		isLoadingAsAnonymous: false,
		handleSignUp: jest.fn(),
		handleAnonymous: jest.fn(),
	};

	const getPasswordFieldEl = () => screen.getByPlaceholderText("8+ Caracteres");
	const getEmailFieldEl = () =>
		screen.getByPlaceholderText("Ex: seuemail@gmail.com");

	const getCreateAccountButtonEl = () => screen.getByText("Criar conta");
	const getAnonymousButtonEl = () =>
		screen.getByLabelText("Continuar sem conta");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getCreateAccountButtonEl()).toBeTruthy();
			expect(getAnonymousButtonEl()).toBeTruthy();
			expect(screen.queryByLabelText("Carregando...")).toBeFalsy();
			expect(
				screen.getByText("Bem-vindo! Crie uma conta para continuar")
			).toBeTruthy();
		});
		it("should render correctly when 'is-loading-as-anonymous' is true", () => {
			useCreateAccountStateSpy.mockReturnValue({
				...mocks,
				isLoadingAsAnonymous: true,
			});
			renderComponent();

			expect(getCreateAccountButtonEl()).toBeTruthy();
			expect(getAnonymousButtonEl()).toBeTruthy();
			expect(screen.getByLabelText("Carregando...")).toBeTruthy();
			expect(
				screen.getByText("Bem-vindo! Crie uma conta para continuar")
			).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Redirect", () => {
			it("should redirect when logging in anonymously", () => {
				useCreateAccountStateSpy.mockReturnValue({
					...mocks,
					user: {} as Omit<UserEntity, "password">,
					wasAnonymousAuthUsed: true,
				});
				renderComponent();

				expect(mockRedirect).toHaveBeenCalled();
				expect(mockRedirect).toHaveBeenCalledWith({ href: "/(tabs)/" }, {});
			});
		});
		describe("Submit", () => {
			const error = "any_message";
			describe("SignUp", () => {
				const credentials = {
					email: "any@email.com",
					password: "any_password",
				};

				it("should handle correctly when handle-sign-up is resolved", async () => {
					mocks.handleSignUp.mockResolvedValue({});
					useCreateAccountStateSpy.mockReturnValue({ ...mocks });
					renderComponent();

					await act(async () => {
						fireEvent.changeText(getEmailFieldEl(), credentials.email);
						fireEvent.changeText(getPasswordFieldEl(), credentials.password);
						fireEvent.press(getCreateAccountButtonEl());

						await waitFor(() => {
							expect(mocks.handleSignUp).toHaveBeenCalledWith({
								email: credentials.email,
								password: credentials.password,
							});
						});
					});
				});
				it("should handle correctly when handle-sign-up is rejected", async () => {
					mocks.handleSignUp.mockRejectedValue(error);
					useCreateAccountStateSpy.mockReturnValue({ ...mocks });
					renderComponent();

					await act(async () => {
						try {
							fireEvent.changeText(getEmailFieldEl(), credentials.email);
							fireEvent.changeText(getPasswordFieldEl(), credentials.password);
							fireEvent.press(getCreateAccountButtonEl());
						} catch (err) {
							await waitFor(() => {
								expect(mocks.handleSignUp).toHaveBeenCalledWith({
									email: credentials.email,
									password: credentials.password,
								});
								expect(screen.getByText(error)).toBeTruthy();
							});
						}
					});
				});
			});
			describe("Anonymous", () => {
				it("should handle correctly when handle-anonymous is resolved", async () => {
					mocks.handleAnonymous.mockResolvedValue({});
					useCreateAccountStateSpy.mockReturnValue({ ...mocks });
					renderComponent();

					await act(async () => {
						fireEvent.press(getAnonymousButtonEl());

						await waitFor(() => {
							expect(mocks.handleAnonymous).toHaveBeenCalled();
						});
					});
				});
				it("should handle correctly when handle-anonymous is rejected", async () => {
					mocks.handleAnonymous.mockRejectedValue(error);
					useCreateAccountStateSpy.mockReturnValue({ ...mocks });
					renderComponent();

					await act(async () => {
						try {
							await fireEvent.press(getAnonymousButtonEl());
						} catch (err) {
							await waitFor(() => {
								expect(mocks.handleAnonymous).toHaveBeenCalled();
							});
						}
					});
				});
			});
		});
	});
});
