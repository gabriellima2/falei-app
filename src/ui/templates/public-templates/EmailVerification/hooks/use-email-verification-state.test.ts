import { act, renderHook } from "@testing-library/react-hooks";
import {
	UseEmailVerificationStateReturn,
	useEmailVerificationState,
} from "./use-email-verification-state";
import {
	ToastContextWrapper,
	mockNotify,
} from "@/__mocks__/toast-context-wrapper";
import * as AuthenticationStore from "@/store/authentication-store/authentication.store";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const executeHook = () =>
	renderHook(useEmailVerificationState, { wrapper: ToastContextWrapper });

describe("useEmailVerificationState", () => {
	const initialTimerValue = 60;
	const mocks = {
		emailVerification: jest.fn(),
	};

	afterAll(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		function expectCorrectReturnType(params: UseEmailVerificationStateReturn) {
			const { timer, isSendingTheEmail, handleSendEmailVerification } = params;

			expect(typeof timer).toBe("number");
			expect(typeof isSendingTheEmail).toBe("boolean");
			expect(typeof handleSendEmailVerification).toBe("function");
		}

		it("should return the initial values correctly", async () => {
			await act(async () => {
				const { result, waitFor } = executeHook();
				await waitFor(() => {
					const { timer, isSendingTheEmail } = result.current;

					expectCorrectReturnType(result.current);
					expect(isSendingTheEmail).toBeTruthy();
					expect(timer).toBe(initialTimerValue);
				});
			});
		});
		it("should return the initial values correctly after the first state update", async () => {
			const { result, waitForNextUpdate } = executeHook();
			await waitForNextUpdate();

			const { timer, isSendingTheEmail } = result.current;

			expectCorrectReturnType(result.current);
			expect(isSendingTheEmail).toBeFalsy();
			expect(timer).toBe(initialTimerValue);
		});
	});
	describe("Interactions", () => {
		describe("handleSendEmailVerification", () => {
			function advanceOneSecond() {
				jest.advanceTimersByTime(1000);
			}

			it("should handle when email-verification service is resolved", async () => {
				jest.useFakeTimers();
				mocks.emailVerification.mockResolvedValue({});
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await act(async () => {
					await result.current.handleSendEmailVerification();

					expect(mocks.emailVerification).toHaveBeenCalled();
					expect(result.current.timer).toBe(initialTimerValue);

					advanceOneSecond();

					expect(result.current.timer).toBe(initialTimerValue - 1);
				});
			});
			it("should handle when email-verification service is rejected", async () => {
				jest.useFakeTimers();
				const error = "any_message";
				mocks.emailVerification.mockRejectedValue(error);
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await act(async () => {
					try {
						await result.current.handleSendEmailVerification();
					} catch (err) {
						expect(mockNotify).toHaveBeenCalledWith(error, { type: "alert" });
						expect(mocks.emailVerification).toHaveBeenCalled();
						expect(result.current.timer).toBe(initialTimerValue);

						advanceOneSecond();

						expect(result.current.timer).toBe(initialTimerValue);
					}
				});
			});
		});
	});
});
