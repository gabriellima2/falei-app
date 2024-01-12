import { renderHook } from "@testing-library/react-hooks";

import { useLoginState } from "./use-login-state";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import type { AuthInputDTO } from "@/dtos/auth.dto";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const executeHook = () => renderHook(useLoginState);

describe("useLoginState", () => {
	const mocks = {
		signIn: jest.fn(),
		checkAuthState: jest.fn(),
	};

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
				mocks.signIn.mockResolvedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await result.current.handleSignIn(credentials);

				expectSignInServiceToHaveBeenCalled(mocks.signIn);
				expect(mocks.checkAuthState).toHaveBeenCalled();
			});
			it("should handle when sign-in service is rejected", async () => {
				mocks.signIn.mockRejectedValue(() => "");
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				try {
					await result.current.handleSignIn(credentials);
				} catch (e) {
					expectSignInServiceToHaveBeenCalled(mocks.signIn);
					expect(mocks.checkAuthState).not.toHaveBeenCalled();
				}
			});
		});
	});
});
