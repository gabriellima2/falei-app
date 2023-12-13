import { renderHook } from "@testing-library/react-hooks";

import {
	useAuthFormState,
	type UseAuthFormStateParams,
} from "./use-auth-form-state";
import { ToastContextWrapper } from "@/__mocks__/toast-context-wrapper";

const executeHook = (params: UseAuthFormStateParams) =>
	renderHook(() => useAuthFormState(params), { wrapper: ToastContextWrapper });

describe("useAuthFormState", () => {
	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook({ onSubmit: jest.fn() });

			const {
				current: { errors, isAuthenticating, setValue, handleAuthentication },
			} = result;

			expect(typeof errors).toBe("object");
			expect(typeof isAuthenticating).toBe("boolean");
			expect(typeof setValue).toBe("function");
			expect(typeof handleAuthentication).toBe("function");
		});
	});
});
