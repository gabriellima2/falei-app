import { fireEvent, screen } from "@testing-library/react-native";

import {
	FilterByCategory,
	type FilterByCategoryProps,
} from "./FilterByCategory";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: FilterByCategoryProps = {
	categories: [
		{ name: "any_name_1", value: "any_value_1" },
		{ name: "any_name_2", value: "any_value_2" },
	],
	values: ["any_name"],
	onChange: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<FilterByCategory {...props} />);

describe("<FilterByCategory", () => {
	const getFirstOption = () => screen.getAllByTestId("check-option")[0];

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { categories } = defaultProps;

			expect(getFirstOption()).toBeTruthy();
			expect(screen.getAllByTestId("check-option")).toHaveLength(
				categories.length
			);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the onChange function passing the value of the pressed exercise", () => {
				renderComponent();

				const { onChange } = defaultProps;
				const el = getFirstOption();
				fireEvent.press(el);

				const {
					categories: [firstCategory],
				} = defaultProps;

				expect(onChange).toHaveBeenCalled();
				expect(onChange).toHaveBeenCalledWith([firstCategory.value]);
			});
		});
	});
});
