import { act, renderHook } from "@testing-library/react-hooks";
import { useCounter, type UseCounterParams } from ".";

const executeHook = (params?: UseCounterParams) =>
	renderHook(() => useCounter(params));

describe("useCounter", () => {
	const defaultValues = {
		initial: 0,
		max: 0,
		min: 0,
	};
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			expect(result.current.count).toBe(defaultValues.initial);
			expect(typeof result.current.increment).toBe("function");
			expect(typeof result.current.decrement).toBe("function");
		});
	});
	describe("Interactions", () => {
		describe("Increment", () => {
			it("should increment the count value", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(defaultValues.initial);
				act(() => {
					result.current.increment();
				});
				expect(result.current.count).toBe(defaultValues.initial + 1);
			});
			it("should not increment the count if it is at the max value", () => {
				const { result } = executeHook({ maxValue: defaultValues.max });

				expect(result.current.count).toBe(defaultValues.initial);

				act(() => {
					result.current.increment();
				});

				expect(result.current.count).toBe(defaultValues.initial);
			});
		});
		describe("Decrement", () => {
			it("should decrement the count value", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(defaultValues.initial);

				act(() => {
					result.current.decrement();
				});

				expect(result.current.count).toBe(defaultValues.initial - 1);
			});
			it("should not decrement the count if it is at the min value", () => {
				const { result } = executeHook({ minValue: defaultValues.min });

				expect(result.current.count).toBe(defaultValues.initial);

				act(() => {
					result.current.decrement();
				});

				expect(result.current.count).toBe(defaultValues.initial);
			});
		});
		describe("Direct Value Change", () => {
			it("should change the count to specific value", () => {
				const { result } = executeHook();

				expect(result.current.count).toBe(defaultValues.initial);
				act(() => {
					result.current.changeCount(5);
				});
				expect(result.current.count).toBe(5);
			});
		});
	});
});
