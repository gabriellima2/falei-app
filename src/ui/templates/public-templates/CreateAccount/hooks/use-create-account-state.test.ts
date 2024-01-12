import { renderHook } from "@testing-library/react-hooks";

import { useCreateAccountState } from "./use-create-account-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/__mocks__/toast-context-wrapper";
import * as AuthenticationStore from "@/store/authentication-store/authentication.store";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { ToastOptions } from "@/contexts/ToastContext";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const executeHook = () =>
	renderHook(useCreateAccountState, { wrapper: ToastContextWrapper });

describe("useCreateAccountState", () => {
	const mocks = {
		anonymous: jest.fn(),
		signUp: jest.fn(),
		checkAuthState: jest.fn(),
	};

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
				mocks.signUp.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await result.current.handleSignUp(credentials);

				expectSignUpServiceToHaveBeenCalled(mocks.signUp);
				expect(mockNotify).toHaveBeenCalled();
				expectNotifyToHaveBeenCalledWith("Conta criada com sucesso", {
					type: "success",
				});
			});
			it("should handle when sign-up service is rejected", async () => {
				mocks.signUp.mockRejectedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				try {
					await result.current.handleSignUp(credentials);
				} catch (e) {
					expectSignUpServiceToHaveBeenCalled(mocks.signUp);
					expect(mockNotify).not.toHaveBeenCalled();
				}
			});
		});
		describe("handleAnonymous", () => {
			it("should handle when anonymous service is resolved", async () => {
				mocks.anonymous.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await result.current.handleAnonymous();

				expect(mocks.anonymous).toHaveBeenCalled();
				expect(mocks.checkAuthState).toHaveBeenCalled();
				expect(mockNotify).not.toHaveBeenCalled();
			});
			it("should handle when sign-up service is rejected", async () => {
				const ERROR_MESSAGE = "any_error";
				mocks.anonymous.mockRejectedValue(() => ERROR_MESSAGE);
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				try {
					await result.current.handleAnonymous();
				} catch (e) {
					expect(mocks.anonymous).toHaveBeenCalled();
					expect(mocks.checkAuthState).not.toHaveBeenCalled();
					expectNotifyToHaveBeenCalledWith(ERROR_MESSAGE, {
						type: "alert",
					});
				}
			});
		});
	});
});
