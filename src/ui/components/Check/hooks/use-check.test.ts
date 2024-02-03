import { act, renderHook } from "@testing-library/react-hooks";
import { useCheck, type UseCheckParams } from "./use-check";

const defaultParams: UseCheckParams = {
	values: ["any_value"],
	onChange: jest.fn(),
};
const executeHook = (params = defaultParams) =>
	renderHook(() => useCheck(params));

describe("UseCheck", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Return", () => {
		it("should return correctly values", () => {
			const { result } = executeHook();

			expect(typeof result.current.handlePress).toBe("function");
			expect(typeof result.current.isChecked).toBe("function");
		});
	});
	describe("Methods", () => {
		const OTHER_VALUE = ["other_value"];
		describe("HandlePress", () => {
			const params = { ...defaultParams, onChange: jest.fn() };
			const cases = [
				{
					params: { ...params, withToggle: true },
					value: params.values,
					expected: [],
					description: "should remove the passed value if it is already added",
				},
				{
					params,
					value: OTHER_VALUE,
					expected: OTHER_VALUE,
					description: "should add the new value by removing the previous one",
				},
				{
					params: { ...params, withMultipleValues: true },
					value: OTHER_VALUE,
					expected: [...params.values, ...OTHER_VALUE],
					description: "should add the new value keeping the previous ones",
				},
			];
			test.each(cases)("%s", ({ params, value, expected }) => {
				const { result } = executeHook(params);

				act(() => {
					result.current.handlePress(value[0]);
				});
				const { onChange } = params;

				expect(onChange).toHaveBeenCalledWith(expected);
			});
		});
		describe("IsChecked", () => {
			const cases = [
				{
					value: defaultParams.values,
					expected: true,
					description: "should return true if the value is already added",
				},
				{
					value: OTHER_VALUE,
					expected: false,
					description: "should return false if the value is not added",
				},
			];
			test.each(cases)("%s", ({ value, expected }) => {
				const { result } = executeHook();

				const isChecked = result.current.isChecked(value[0]);

				expected
					? expect(isChecked).toBeTruthy()
					: expect(isChecked).toBeFalsy();
			});
		});
	});
});
