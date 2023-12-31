import { renderHook } from "@testing-library/react-hooks";

import { useLoginState, UseLoginStateParams } from "./use-login-state";
import type { AuthInputDTO } from "@/dtos/auth.dto";

const mockCheckAuthState = jest.fn();

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

jest.mock("@/store/auth-store", () => ({
	__esModule: true,
	default: jest.fn(),
	useAuthStore: jest.fn(() => ({
		checkAuthState: mockCheckAuthState,
	})),
}));

const defaultParams: UseLoginStateParams = {
	signIn: jest.fn(),
};
const executeHook = (params = defaultParams) =>
	renderHook(() => useLoginState(params));

describe("useLoginState", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { handleSignIn },
			} = result;

			expect(typeof handleSignIn).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("handleSignIn", () => {
			const credentials: AuthInputDTO = {
				email: "any@email.com",
				password: "any_password",
			};

			function expectSignInServiceToHaveBeenCalled(signIn: jest.Mock) {
				expect(signIn).toHaveBeenCalled();
				expect(signIn).toHaveBeenCalledWith(credentials);
			}

			it("should handle when sign-in service is resolved", async () => {
				const mockSignIn = jest.fn().mockResolvedValue(() => "");
				const { result } = executeHook({ signIn: mockSignIn });

				await result.current.handleSignIn(credentials);

				expectSignInServiceToHaveBeenCalled(mockSignIn);
				expect(mockCheckAuthState).toHaveBeenCalled();
			});
			it("should handle when sign-in service is rejected", async () => {
				const mockSignIn = jest.fn().mockRejectedValue(() => "");
				const { result } = executeHook({ signIn: mockSignIn });

				try {
					await result.current.handleSignIn(credentials);
				} catch (e) {
					expectSignInServiceToHaveBeenCalled(mockSignIn);
					expect(mockCheckAuthState).not.toHaveBeenCalled();
				}
			});
		});
	});
});
