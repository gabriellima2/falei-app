import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { SendEmail } from "./SendEmail";

import { ToastProvider } from "@/contexts/ToastContext";
import * as SendEmailState from "./hooks/use-send-email-state";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const useSendEmailStateSpy = jest.spyOn(SendEmailState, "useSendEmailState");

const renderComponent = () =>
	renderWithThemeProvider(
		<ToastProvider>
			<SendEmail />
		</ToastProvider>
	);

describe("<SendEmail />", () => {
	const mocks = {
		handleResetPassword: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const getSubmitButtonEl = () => screen.getByText("Continuar");
	const getEmailFieldEl = () =>
		screen.getByPlaceholderText("Ex: seuemail@gmail.com");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Esqueceu a senha?")).toBeTruthy();
			expect(screen.getByLabelText("Email")).toBeTruthy();
			expect(getEmailFieldEl()).toBeTruthy();
			expect(getSubmitButtonEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		const error = "any_message";
		const credentials = { email: "any@email.com" };
		describe("Submit", () => {
			it("should handle correctly when handle-reset-password is resolved", async () => {
				mocks.handleResetPassword.mockResolvedValue({});
				useSendEmailStateSpy.mockReturnValue({ ...mocks });
				renderComponent();

				act(() => {
					fireEvent.changeText(getEmailFieldEl(), credentials.email);
					fireEvent.press(getSubmitButtonEl());
				});

				await waitFor(() => {
					expect(mocks.handleResetPassword).toHaveBeenCalledWith(credentials);
					expect(screen.queryByText(error)).not.toBeTruthy();
				});
			});
			it("should handle correctly when handle-reset-password is rejected", async () => {
				mocks.handleResetPassword.mockRejectedValue(new Error(error));
				useSendEmailStateSpy.mockReturnValue({ ...mocks });
				renderComponent();

				await act(async () => {
					try {
						fireEvent.changeText(getEmailFieldEl(), credentials.email);
						fireEvent.press(getSubmitButtonEl());
					} catch (err) {
						await waitFor(() => {
							expect(mocks.handleResetPassword).toHaveBeenCalledWith(
								credentials
							);
							expect(screen.getByText(error)).toBeTruthy();
						});
					}
				});
			});
		});
	});
});
