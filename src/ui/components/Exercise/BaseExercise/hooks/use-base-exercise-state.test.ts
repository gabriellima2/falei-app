import { renderHook } from "@testing-library/react-hooks";

import {
	useBaseExerciseState,
	type UseBaseExerciseStateParams,
} from "./use-base-exercise-state";

import { MenuContextWrapper, mocks } from "@/test-utils/menu-context-wrapper";
import { interactions } from "../constants/interactions";

import type { MenuOption } from "@/contexts/MenuContext";

const defaultParams: UseBaseExerciseStateParams = {
	id: "1",
	title: "any_title",
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useBaseExerciseState(params), {
		wrapper: MenuContextWrapper,
	});

describe("useBaseExerciseState", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { handleLongPress },
			} = result;

			expect(typeof handleLongPress).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("HandleExpand", () => {
			function expectHandleExpandToHaveBeenCalled(params: MenuOption[]) {
				expect(mocks.handleExpand).toBeCalledTimes(1);
				expect(mocks.handleExpand).toBeCalledWith(params);
			}

			it("should call the 'handleExpand' function correctly when 'handleLongPress' is called with default options", () => {
				const { result } = executeHook();

				result.current.handleLongPress();

				expectHandleExpandToHaveBeenCalled([interactions.create]);
			});
			it("should call the 'handleExpand' function correctly when 'handleLongPress' is called with custom options", () => {
				const { result } = executeHook({
					...defaultParams,
					withCustomOptions: true,
				});

				result.current.handleLongPress();

				expectHandleExpandToHaveBeenCalled([
					interactions.create,
					interactions.remove,
				]);
			});
		});
		describe("HandleClose", () => {
			it("should call the 'handleClose' function when 'handleLongPress' is called with another 'id' value", () => {
				const { result } = executeHook();

				result.current.handleLongPress();

				expect(mocks.handleExpand).toBeCalled();
				expect(mocks.handleClose).not.toBeCalled();

				jest.clearAllMocks();
				const { result: newResult } = executeHook({
					id: "2",
					title: "any_title_2",
				});

				newResult.current.handleLongPress();

				expect(mocks.handleExpand).toBeCalledTimes(1);
				expect(mocks.handleClose).toBeCalled();
			});
		});
	});
});
