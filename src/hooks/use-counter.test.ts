import { act, renderHook } from "@testing-library/react-hooks";
import { useCounter, UseCounterParams } from "./use-counter";

const INITIAL_VALUE = 0;
const MAX_VALUE = 0;
const MIN_VALUE = 0;
const executeHook = (params?: UseCounterParams) =>
	renderHook(() => useCounter(params));

describe("useCounter", () => {
	describe("Initial Values", () => {
		it("should return the initial values", () => {
			const { result } = executeHook();

			expect(result.current.count).toBe(INITIAL_VALUE);
			expect(typeof result.current.increment).toBe("function");
			expect(typeof result.current.decrement).toBe("function");
		});
	});
	describe("Methods", () => {
		describe("Increment", () => {
			it("should increment the count", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(INITIAL_VALUE);
				act(() => {
					result.current.increment();
				});
				expect(result.current.count).toBe(INITIAL_VALUE + 1);
			});
			it("should not increment the count if it is at the max value", () => {
				const { result } = executeHook({ maxValue: MAX_VALUE });

				expect(result.current.count).toBe(INITIAL_VALUE);
				act(() => {
					result.current.increment();
				});
				expect(result.current.count).toBe(INITIAL_VALUE);
			});
		});
		describe("Decrement", () => {
			it("should decrement the count", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(INITIAL_VALUE);
				act(() => {
					result.current.decrement();
				});
				expect(result.current.count).toBe(INITIAL_VALUE - 1);
			});
			it("should not decrement the count if it is at the min value", () => {
				const { result } = executeHook({ minValue: MIN_VALUE });

				expect(result.current.count).toBe(INITIAL_VALUE);
				act(() => {
					result.current.decrement();
				});
				expect(result.current.count).toBe(INITIAL_VALUE);
			});
		});
		describe("ChangeCount", () => {
			it("should change the count to specific value", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(INITIAL_VALUE);
				act(() => {
					result.current.changeCount(5);
				});
				expect(result.current.count).toBe(5);
			});
		});
	});
});
