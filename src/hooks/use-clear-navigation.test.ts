import * as ExpoRouter from "expo-router";
import { renderHook } from "@testing-library/react-native";

import { useClearNavigation } from "./use-clear-navigation";

const useNavigationSpy = jest.spyOn(ExpoRouter, "useNavigation");

const GET_STATE_RETURN = { routes: [{ name: "route_1" }, { name: "route_2" }] };
const defaultParams: string[] = [GET_STATE_RETURN.routes[1].name];

const executeHook = () => renderHook(() => useClearNavigation(defaultParams));

describe("UseClearNavigation", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			expect(typeof result.current).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("Reset Routes", () => {
			const mockReset = jest.fn();
			it("should remove the passed routes", () => {
				useNavigationSpy.mockReturnValue({
					getState: jest.fn().mockReturnValue(GET_STATE_RETURN),
					reset: mockReset,
				} as unknown as ReturnType<typeof ExpoRouter.useNavigation>);

				const { result } = executeHook();
				result.current();

				expect(mockReset).toHaveBeenCalledWith({
					index: 0,
					routes: [{ name: "route_1" }],
				});
			});
		});
	});
});
