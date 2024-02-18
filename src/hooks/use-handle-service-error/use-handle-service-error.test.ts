import { FirebaseError } from "firebase/app";
import { renderHook } from "@testing-library/react-hooks";

import { useHandleServiceError } from "./use-handle-service-error";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/test-utils/toast-context-wrapper";
import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";

const executeHook = () =>
	renderHook(useHandleServiceError, { wrapper: ToastContextWrapper });

describe("useHandleServiceError", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const { handleServiceError } = result.current;

			expect(typeof handleServiceError).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("handleServiceError", () => {
			it("should handle the error when it is a default error and there is no message", () => {
				const { result } = executeHook();

				const error = new Error();
				result.current.handleServiceError(error);

				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(UNEXPECTED_ERROR, {
					type: "alert",
				});
			});
			it("should handle the error when it is a default error and there has message", () => {
				const message = "any_message";
				const { result } = executeHook();

				const error = new Error(message);
				result.current.handleServiceError(error);

				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(message, { type: "alert" });
			});
			it("should handle the error when it is a firebase error", () => {
				const cause = "email-already-in-use";
				const message = FIREBASE_ERROR_MESSAGES[cause];
				const { result } = executeHook();

				const error = new FirebaseError(cause, "english-message");
				result.current.handleServiceError(error);

				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(message, { type: "alert" });
			});
		});
	});
});
