import { renderHook } from "@testing-library/react-hooks";

import {
	useCreateAccountState,
	type UseCreateAccountStateParams,
} from "./use-create-account-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "../mocks/toast-context-wrapper";

import type { AuthInputDTO } from "@/dtos/auth.dto";

const defaultParams: UseCreateAccountStateParams<void> = {
	authentication: jest.fn(),
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useCreateAccountState(params), {
		wrapper: ToastContextWrapper,
	});

describe("useCreateAccountState", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { handleSignUp },
			} = result;

			expect(typeof handleSignUp).toBe("function");
		});
	});
	describe("Interactions", () => {
		const credentials: AuthInputDTO = { email: "hello", password: "world" };

		function expectAuthenticationToHaveBeenCalled(authentication: jest.Mock) {
			expect(authentication).toHaveBeenCalled();
			expect(authentication).toHaveBeenCalledWith(credentials);
		}

		it("should handle when authentication is completed correctly", async () => {
			const mockAuthentication = jest.fn().mockResolvedValue(() => "");
			const { result } = executeHook({ authentication: mockAuthentication });

			await result.current.handleSignUp(credentials);

			expectAuthenticationToHaveBeenCalled(mockAuthentication);
			expect(mockNotify).toHaveBeenCalled();
			expect(mockNotify).toHaveBeenCalledWith("Conta criada com sucesso", {
				type: "success",
			});
		});
		it("should handle when authentication throw an error", async () => {
			const mockAuthentication = jest.fn().mockRejectedValue(() => "");
			const { result } = executeHook({ authentication: mockAuthentication });

			try {
				await result.current.handleSignUp(credentials);
			} catch (e) {
				expectAuthenticationToHaveBeenCalled(mockAuthentication);
				expect(mockNotify).not.toHaveBeenCalled();
			}
		});
	});
});
