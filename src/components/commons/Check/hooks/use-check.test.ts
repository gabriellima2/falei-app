import { act, renderHook } from "@testing-library/react-hooks";
import { useCheck, type UseCheckParams } from "./use-check";

const defaultParams: UseCheckParams = { initialValue: "any_value" };
const executeHook = (params = defaultParams) =>
	renderHook(() => useCheck(params));

describe("UseCheck", () => {
	describe("Return", () => {
		it("should return correctly values", () => {
			const { result } = executeHook();

			expect(typeof result.current.handlePress).toBe("function");
			expect(typeof result.current.isChecked).toBe("function");
		});
	});
	describe("Methods", () => {
		const OTHER_VALUE = "other_value";
		describe("HandlePress", () => {
			const params = { ...defaultParams, onChange: jest.fn() };
			it("should remove the passed value if it is already added", () => {
				const { result } = executeHook(params);

				act(() => {
					result.current.handlePress(params.initialValue);
				});

				expect(result.current.values).toMatchObject([]);
				expect(params.onChange).toHaveBeenCalledWith([params.initialValue]);
			});
			it("should add the new value by removing the previous one", () => {
				const { result } = executeHook(params);

				act(() => {
					result.current.handlePress(OTHER_VALUE);
				});

				expect(result.current.values).toMatchObject([OTHER_VALUE]);
				expect(params.onChange).toHaveBeenCalledWith([OTHER_VALUE]);
			});
			it("should add the new value keeping the previous ones", () => {
				const { result } = executeHook({ ...params, multipleValues: true });

				act(() => {
					result.current.handlePress(OTHER_VALUE);
				});

				expect(result.current.values).toMatchObject([
					params.initialValue,
					OTHER_VALUE,
				]);
				expect(params.onChange).toHaveBeenCalledWith([OTHER_VALUE]);
			});
		});
		describe("IsChecked", () => {
			it("should return true if the value is already added", () => {
				const { result } = executeHook();

				const isChecked = result.current.isChecked(defaultParams.initialValue);

				expect(isChecked).toBeTruthy();
			});
			it("should return false if the value is not added", () => {
				const { result } = executeHook();

				const isChecked = result.current.isChecked(OTHER_VALUE);

				expect(isChecked).toBeFalsy();
			});
		});
	});
});
