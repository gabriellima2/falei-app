import { renderHook } from "@testing-library/react-hooks";

import { useLoginState, UseLoginStateParams } from "./use-login-state";

import { mockReplace } from "jest-setup";
import type { AuthInputDTO } from "@/dtos/auth.dto";

const mockClearNavigation = jest.fn();
jest.mock("@/hooks/use-clear-navigation.ts", () => ({
	useClearNavigation: () => mockClearNavigation,
}));

const defaultParams: UseLoginStateParams<void> = {
	authentication: jest.fn(),
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
		describe("Authentication", () => {
			const credentials: AuthInputDTO = { email: "hello", password: "world" };

			function expectAuthenticationToHaveBeenCalled(authentication: jest.Mock) {
				expect(authentication).toHaveBeenCalled();
				expect(authentication).toHaveBeenCalledWith(credentials);
			}

			it("should handle when authentication is completed correctly", async () => {
				const mockAuthentication = jest.fn().mockResolvedValue(() => "");
				const { result } = executeHook({ authentication: mockAuthentication });

				await result.current.handleSignIn(credentials);

				expectAuthenticationToHaveBeenCalled(mockAuthentication);
				expect(mockClearNavigation).toHaveBeenCalled();
				expect(mockReplace).toHaveBeenCalled();
			});
			it("should handle when authentication throw an error", async () => {
				const mockAuthentication = jest.fn().mockRejectedValue(() => "");
				const { result } = executeHook({ authentication: mockAuthentication });

				try {
					await result.current.handleSignIn(credentials);
				} catch (e) {
					expectAuthenticationToHaveBeenCalled(mockAuthentication);
					expect(mockClearNavigation).not.toHaveBeenCalled();
					expect(mockReplace).not.toHaveBeenCalled();
				}
			});
		});
	});
});
