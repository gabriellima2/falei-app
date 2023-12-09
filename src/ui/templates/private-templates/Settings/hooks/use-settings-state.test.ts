import { act, renderHook } from "@testing-library/react-hooks";

import { useSettingsState } from "./use-settings-state";

import {
	mockNotify,
	ToastContextWrapper,
} from "@/__mocks__/toast-context-wrapper";
import { firebaseAuth } from "@/helpers/firebase-auth";

jest.mock("@/helpers/firebase-auth", () => ({
	firebaseAuth: {
		signOut: jest.fn(),
	},
}));

const signOutSpy = jest.spyOn(firebaseAuth, "signOut");

const executeHook = () =>
	renderHook(useSettingsState, {
		wrapper: ToastContextWrapper,
	});

describe("useSettingsState", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { handleLogout },
			} = result;

			expect(typeof handleLogout).toBe("function");
		});
	});
	describe("Interactions", () => {
		it("should handle when 'handleLogout' is resolved", async () => {
			signOutSpy.mockResolvedValue();
			const { result } = executeHook();

			await act(async () => {
				await result.current.handleLogout();
			});

			expect(mockNotify).not.toHaveBeenCalled();
		});
		it("should handle when 'handleLogout' is rejected", async () => {
			signOutSpy.mockRejectedValue(() => "");
			const { result } = executeHook();

			try {
				await act(async () => {
					await result.current.handleLogout();
				});
			} catch (e) {
				expect(mockNotify).toHaveBeenCalled();
				expect(mockNotify).toHaveBeenCalledWith(
					"Desculpe, encontramos um problema ao tentar encerrar sua sessão",
					{
						type: "alert",
					}
				);
			}
		});
	});
});
