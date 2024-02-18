import { act, renderHook } from "@testing-library/react-hooks";

import {
	useSendEmailFormState,
	type UseSendEmailFormStateParams,
} from "./use-send-email-form-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/test-utils/toast-context-wrapper";

const defaultParams: UseSendEmailFormStateParams = {
	resetPasswordService: jest.fn(),
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useSendEmailFormState(params), {
		wrapper: ToastContextWrapper,
	});

describe("useSendEmailFormState", () => {
	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				errors,
				isSubmitting,
				setValue,
				handleSubmit,
				handleSendPasswordResetEmail,
			} = result.current;

			expect(typeof errors).toBe("object");
			expect(typeof isSubmitting).toBe("boolean");
			expect(typeof setValue).toBe("function");
			expect(typeof handleSubmit).toBe("function");
			expect(typeof handleSendPasswordResetEmail).toBe("function");
			expect(errors).toMatchObject({});
			expect(isSubmitting).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		describe("ResetPassword", () => {
			const defaultCredentials = { email: "any_email@domain.com" };
			it("should handle correctly when reset-password-service is resolved", async () => {
				const resetPasswordServiceMock = jest.fn().mockResolvedValue({});
				const { result } = executeHook({
					resetPasswordService: resetPasswordServiceMock,
				});

				await act(async () => {
					await result.current.handleSendPasswordResetEmail(defaultCredentials);
				});

				expect(mockNotify).not.toHaveBeenCalled();
				expect(result.current.isSubmitting).toBeFalsy();
			});
			it("should handle correctly when reset-password-service is rejected", async () => {
				const ERROR_MESSAGE = "any_message";
				const resetPasswordServiceMock = jest
					.fn()
					.mockRejectedValue(new Error(ERROR_MESSAGE));
				const { result } = executeHook({
					resetPasswordService: resetPasswordServiceMock,
				});

				await act(async () => {
					await result.current.handleSendPasswordResetEmail(defaultCredentials);
				});

				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(ERROR_MESSAGE, {
					type: "alert",
				});
				expect(result.current.isSubmitting).toBeFalsy();
			});
		});
	});
});
