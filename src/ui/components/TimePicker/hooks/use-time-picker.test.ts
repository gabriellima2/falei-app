import { act, renderHook } from "@testing-library/react-hooks";
import { useTimePicker } from "./use-time-picker";

const executeHook = () => renderHook(useTimePicker);

describe("useTimePicker", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const { isShowPicker, showPicker, handleTimeChange } = result.current;

			expect(typeof isShowPicker).toBe("boolean");
			expect(typeof handleTimeChange).toBe("function");
			expect(typeof showPicker).toBe("function");
			expect(isShowPicker).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		describe("Show Picker", () => {
			it("should change the value of is-show-picker to true when the show-picker function is called", () => {
				const { result } = executeHook();

				const { showPicker } = result.current;

				expect(result.current.isShowPicker).toBeFalsy();
				act(() => {
					showPicker();
				});
				expect(result.current.isShowPicker).toBeTruthy();
			});
		});
		describe("Time Change", () => {
			it("should change the value of is-show-picker to false and call the callback function with selected date as a parameter when on-time-change is called", () => {
				const { result } = executeHook();

				const { showPicker, handleTimeChange } = result.current;

				act(() => {
					showPicker();
				});

				expect(result.current.isShowPicker).toBeTruthy();

				const params = { date: new Date(), callback: jest.fn() };
				act(() => {
					handleTimeChange(params.date, params.callback);
				});

				expect(result.current.isShowPicker).toBeFalsy();
				expect(params.callback).toHaveBeenCalledTimes(1);
				expect(params.callback).toHaveBeenCalledWith(params.date);
			});
		});
	});
});
