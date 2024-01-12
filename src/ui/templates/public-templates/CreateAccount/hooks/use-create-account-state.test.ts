import { renderHook } from "@testing-library/react-hooks";

import {
	useCreateAccountState,
	type UseCreateAccountStateParams,
} from "./use-create-account-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/__mocks__/toast-context-wrapper";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { ToastOptions } from "@/contexts/ToastContext";

const mockCheckAuthState = jest.fn();

jest.mock("@/store/authentication-store", () => ({
	__esModule: true,
	default: jest.fn(),
	useAuthenticationStore: jest.fn(() => ({
		checkAuthState: mockCheckAuthState,
	})),
}));

const defaultParams: UseCreateAccountStateParams = {
	signUp: jest.fn(),
	anonymous: jest.fn(),
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useCreateAccountState(params), {
		wrapper: ToastContextWrapper,
	});

describe("useCreateAccountState", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { handleSignUp },
			} = result;

			expect(typeof handleSignUp).toBe("function");
		});
	});
	describe("Interactions", () => {
		function expectNotifyToHaveBeenCalledWith(
			message: string,
			options: ToastOptions
		) {
			expect(mockNotify).toHaveBeenCalledWith(message, options);
		}

		describe("handleSignUp", () => {
			const credentials: AuthInputDTO = {
				email: "any@email.com",
				password: "any_password",
			};

			function expectSignUpServiceToHaveBeenCalled(signUp: jest.Mock) {
				expect(signUp).toHaveBeenCalled();
				expect(signUp).toHaveBeenCalledWith(credentials);
			}

			it("should handle when sign-up service is resolved", async () => {
				const mockSignUp = jest.fn().mockResolvedValue(() => "");
				const { result } = executeHook({
					...defaultParams,
					signUp: mockSignUp,
				});

				await result.current.handleSignUp(credentials);

				expectSignUpServiceToHaveBeenCalled(mockSignUp);
				expect(mockNotify).toHaveBeenCalled();
				expectNotifyToHaveBeenCalledWith("Conta criada com sucesso", {
					type: "success",
				});
			});
			it("should handle when sign-up service is rejected", async () => {
				const mockSignUp = jest.fn().mockRejectedValue(() => "");
				const { result } = executeHook({
					...defaultParams,
					signUp: mockSignUp,
				});

				try {
					await result.current.handleSignUp(credentials);
				} catch (e) {
					expectSignUpServiceToHaveBeenCalled(mockSignUp);
					expect(mockNotify).not.toHaveBeenCalled();
				}
			});
		});
		describe("handleAnonymous", () => {
			it("should handle when anonymous service is resolved", async () => {
				const mockAnonymousAuth = jest.fn().mockResolvedValue(() => "");
				const { result } = executeHook({
					...defaultParams,
					anonymous: mockAnonymousAuth,
				});

				await result.current.handleAnonymous();

				expect(mockAnonymousAuth).toHaveBeenCalled();
				expect(mockCheckAuthState).toHaveBeenCalled();
				expect(mockNotify).not.toHaveBeenCalled();
			});
			it("should handle when sign-up service is rejected", async () => {
				const ERROR_MESSAGE = "any_error";
				const mockAnonymousAuth = jest
					.fn()
					.mockRejectedValue(() => ERROR_MESSAGE);
				const { result } = executeHook({
					...defaultParams,
					anonymous: mockAnonymousAuth,
				});

				try {
					await result.current.handleAnonymous();
				} catch (e) {
					expect(mockAnonymousAuth).toHaveBeenCalled();
					expect(mockCheckAuthState).not.toHaveBeenCalled();
					expectNotifyToHaveBeenCalledWith(ERROR_MESSAGE, {
						type: "alert",
					});
				}
			});
		});
	});
});
