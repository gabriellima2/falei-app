import { fireEvent, screen } from "@testing-library/react-native";

import { EmailVerification } from "./EmailVerification";
import * as EmailVerificationState from "./hooks/use-email-verification-state";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const useEmailVerificationStateSpy = jest.spyOn(
	EmailVerificationState,
	"useEmailVerificationState"
);

const renderComponent = () => renderWithThemeProvider(<EmailVerification />);

describe("<EmailVerification />", () => {
	const mocks = {
		timer: 10,
		isSendingTheEmail: false,
		handleSendEmailVerification: jest.fn(),
	};

	const getSendEmailButtonEl = () =>
		screen.getByLabelText("Verificar endereço de e-mail");

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		const getTimerText = (timer: number) =>
			`Enviar novamente em ${timer} segundos`;
		const getSendEmailButtonState = () =>
			getSendEmailButtonEl().props.accessibilityState;

		const description =
			"Enviamos um link para o seu endereço de e-mail para você verificar a sua conta";

		it("should render correctly", () => {
			useEmailVerificationStateSpy.mockReturnValue({ ...mocks });
			renderComponent();

			expect(screen.getByText(description)).toBeTruthy();
			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(screen.getByText("Reenviar link de verificação")).toBeTruthy();
			expect(screen.getByText(getTimerText(mocks.timer))).toBeTruthy();
			expect(getSendEmailButtonState().disabled).toBeTruthy();
		});
		it("should render correctly when the email is being sent and the timer is different from the default value", () => {
			const timer = 8;
			useEmailVerificationStateSpy.mockReturnValue({
				...mocks,
				timer,
				isSendingTheEmail: true,
			});
			renderComponent();

			expect(screen.getByText(description)).toBeTruthy();
			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(screen.getByText("Aguarde, enviando...")).toBeTruthy();
			expect(screen.getByText(getTimerText(timer))).toBeTruthy();
			expect(getSendEmailButtonState().disabled).toBeTruthy();
		});
		it("should render correctly when the timer is zero", () => {
			const timer = 0;
			useEmailVerificationStateSpy.mockReturnValue({ ...mocks, timer });
			renderComponent();

			expect(screen.getByText(description)).toBeTruthy();
			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(screen.getByText("Reenviar link de verificação")).toBeTruthy();
			expect(screen.getByText(getTimerText(timer))).toBeTruthy();
			expect(getSendEmailButtonState().disabled).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the handle-send-email-verification function when send-email-button is pressed", () => {
				useEmailVerificationStateSpy.mockReturnValue({
					...mocks,
					isSendingTheEmail: false,
					timer: 0,
				});
				renderComponent();

				const sendEmailButton = getSendEmailButtonEl();
				fireEvent.press(sendEmailButton);

				expect(mocks.handleSendEmailVerification).toHaveBeenCalled();
				expect(mocks.handleSendEmailVerification).toHaveBeenCalledTimes(1);
			});
			it("should not call the handle-send-email-verification function when send-email-button is pressed when it is disabled", () => {
				useEmailVerificationStateSpy.mockReturnValue({ ...mocks });
				renderComponent();

				const sendEmailButton = getSendEmailButtonEl();
				fireEvent.press(sendEmailButton);

				expect(mocks.handleSendEmailVerification).not.toHaveBeenCalled();
			});
		});
	});
});
