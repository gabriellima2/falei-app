import * as ExpoRouter from "expo-router";
import { renderHook } from "@testing-library/react-native";

import { useClearNavigation } from "./use-clear-navigation";

const GET_STATE_RETURN = { routes: [{ name: "route_1" }, { name: "route_2" }] };
const ROUTES_TO_CLEAN = [GET_STATE_RETURN.routes[1].name];

const executeHook = () => renderHook(() => useClearNavigation(ROUTES_TO_CLEAN));

describe("UseClearNavigation", () => {
	it("should remove the passed routes", () => {
		const mockGetState = jest.fn().mockReturnValue(GET_STATE_RETURN);
		const mockReset = jest.fn();
		jest.spyOn(ExpoRouter, "useNavigation").mockReturnValue({
			getState: mockGetState,
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
