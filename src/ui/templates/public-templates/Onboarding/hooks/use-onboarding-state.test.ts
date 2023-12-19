import { act, renderHook } from "@testing-library/react-hooks";
import { useOnboardingState } from "./use-onboarding-state";

const executeHook = () => renderHook(useOnboardingState);

describe("useOnboardingState", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const {
				result: { current },
			} = executeHook();

			const {
				currentItem,
				isLast,
				isFirst,
				handleBackPress,
				handleForwardPress,
				handleCurrentItemChange,
			} = current;

			expect(typeof currentItem).toBe("number");
			expect(typeof isLast).toBe("boolean");
			expect(typeof isFirst).toBe("boolean");
			expect(typeof handleBackPress).toBe("function");
			expect(typeof handleForwardPress).toBe("function");
			expect(typeof handleCurrentItemChange).toBe("function");
			expect(currentItem).toBe(0);
			expect(isFirst).toBeTruthy();
			expect(isLast).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		it("should increment the 'currentItem' value when 'handleForwardPress' is called", () => {
			const { result } = executeHook();

			act(() => {
				result.current.handleForwardPress();
			});

			expect(result.current.currentItem).toBe(1);
		});
		it("should decrement the 'currentItem' value when 'handleBackPress' is called", () => {
			const { result } = executeHook();

			act(() => {
				result.current.handleForwardPress();
				result.current.handleForwardPress();
			});
			act(() => {
				result.current.handleBackPress();
			});

			expect(result.current.currentItem).toBe(1);
		});
		it("should set the value '3' in 'currentItem' when 'handleCurrentItemChange' is called", () => {
			const { result } = executeHook();

			act(() => {
				result.current.handleCurrentItemChange(3);
			});

			expect(result.current.currentItem).toBe(3);
		});
	});
});
