import { act, renderHook } from "@testing-library/react-hooks";

import {
	useAuthFormState,
	type UseAuthFormStateParams,
} from "./use-auth-form-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/__mocks__/toast-context-wrapper";

const defaultParams: UseAuthFormStateParams = {
	onSubmit: jest.fn(),
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useAuthFormState(params), { wrapper: ToastContextWrapper });

describe("useAuthFormState", () => {
	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: {
					errors,
					isAuthenticating,
					setValue,
					handleAuthentication,
					handleSubmit,
				},
			} = result;

			expect(typeof errors).toBe("object");
			expect(typeof isAuthenticating).toBe("boolean");
			expect(typeof setValue).toBe("function");
			expect(typeof handleSubmit).toBe("function");
			expect(typeof handleAuthentication).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("Authentication", () => {
			const defaultCredentials = {
				email: "any_email@domain.com",
				password: "any_password",
			};
			it("should handle correctly when authentication is resolved", async () => {
				const { result } = executeHook({
					...defaultParams,
					onSubmit: jest.fn().mockResolvedValueOnce({}),
				});

				await act(async () => {
					await result.current.handleAuthentication(defaultCredentials);
				});

				expect(mockNotify).not.toBeCalled();
				expect(result.current.isAuthenticating).toBe(false);
			});
			it("should handle correctly when authentication is rejected", async () => {
				const ERROR_MESSAGE = "any_message";
				const { result } = executeHook({
					onSubmit: jest.fn().mockRejectedValueOnce(new Error(ERROR_MESSAGE)),
				});

				await act(async () => {
					await result.current.handleAuthentication(defaultCredentials);
				});

				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(ERROR_MESSAGE, {
					type: "alert",
				});
				expect(result.current.isAuthenticating).toBe(false);
			});
		});
	});
});
