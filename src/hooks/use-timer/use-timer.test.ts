import { act, renderHook } from "@testing-library/react-hooks";
import { UseTimerParams, useTimer } from "./use-timer";

const defaultParams: UseTimerParams = { initialValue: 3 };

const executeHook = (params = defaultParams) =>
	renderHook(() => useTimer(params));

describe("useTimer", () => {
	beforeAll(() => {
		jest.useRealTimers();
	});

	function advanceTimer(ms = 1000) {
		act(() => {
			jest.advanceTimersByTime(ms);
		});
	}

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const { timer, defineTimer, resetTimer } = result.current;

			expect(typeof timer).toBe("number");
			expect(typeof defineTimer).toBe("function");
			expect(typeof resetTimer).toBe("function");
			expect(timer).toBe(defaultParams.initialValue);
		});

		it("should decrease the timer value after one second", () => {
			jest.useFakeTimers();
			const { result } = executeHook();

			advanceTimer();

			expect(result.current.timer).toBe(2);

			advanceTimer();

			expect(result.current.timer).toBe(1);
		});
		it("should not decrease the timer value when it is at zero", () => {
			jest.useFakeTimers();
			const { result } = executeHook({ initialValue: 0 });

			advanceTimer();

			expect(result.current.timer).toBe(0);
		});
	});
	describe("Interactions", () => {
		describe("resetTimer", () => {
			it("should reset the timer value when reset-timer function is called", () => {
				jest.useFakeTimers();
				const { result } = executeHook();

				advanceTimer();

				expect(result.current.timer).toBe(2);

				act(() => {
					result.current.resetTimer();
				});

				expect(result.current.timer).toBe(defaultParams.initialValue);
			});
		});
		describe("defineTimer", () => {
			it("should define a new timer when define-timer function is called", () => {
				jest.useFakeTimers();

				const initialValue = 2;
				const { result } = executeHook({ initialValue });

				const intervalInMilliseconds = 5000;
				const executionTimeInMilliseconds =
					intervalInMilliseconds * initialValue;

				result.current.defineTimer(5000);

				advanceTimer(executionTimeInMilliseconds);

				expect(result.current.timer).toBe(0);
			});
		});
	});
});
