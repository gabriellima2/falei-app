import { renderHook } from "@testing-library/react-hooks";

import { useSendEmailState } from "./use-send-email-state";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import { mockReplace } from "jest-setup";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const executeHook = () => renderHook(useSendEmailState);

describe("useSendEmailState", () => {
	const mocks = {
		resetPassword: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const { handleResetPassword } = result.current;

			expect(typeof handleResetPassword).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("handleResetPassword", () => {
			const credentials = { email: "any@email.com" };
			it("should handle when reset-password service is resolved", async () => {
				mocks.resetPassword.mockResolvedValue({});
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				await result.current.handleResetPassword(credentials);

				expect(mocks.resetPassword).toHaveBeenCalled();
				expect(mocks.resetPassword).toHaveBeenCalledWith(credentials);
				expect(mockReplace).toHaveBeenCalled();
			});
			it("should handle when reset-password service is reject", async () => {
				mocks.resetPassword.mockRejectedValue({});
				authenticationStoreSpy.mockReturnValue({ ...mocks });
				const { result } = executeHook();

				try {
					await result.current.handleResetPassword(credentials);
				} catch (e) {
					expect(mocks.resetPassword).toHaveBeenCalled();
					expect(mocks.resetPassword).toHaveBeenCalledWith(credentials);
					expect(mockReplace).not.toHaveBeenCalled();
				}
			});
		});
	});
});
