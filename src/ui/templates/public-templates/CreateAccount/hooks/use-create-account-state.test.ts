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

const defaultParams: UseCreateAccountStateParams = {
	signUp: jest.fn(),
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
				const { result } = executeHook({ signUp: mockSignUp });

				await result.current.handleSignUp(credentials);

				expectSignUpServiceToHaveBeenCalled(mockSignUp);
				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith("Conta criada com sucesso", {
					type: "success",
				});
			});
			it("should handle when sign-up service is rejected", async () => {
				const mockSignUp = jest.fn().mockRejectedValue(() => "");
				const { result } = executeHook({ signUp: mockSignUp });

				try {
					await result.current.handleSignUp(credentials);
				} catch (e) {
					expectSignUpServiceToHaveBeenCalled(mockSignUp);
					expect(mockNotify).not.toHaveBeenCalled();
				}
			});
		});
	});
});
