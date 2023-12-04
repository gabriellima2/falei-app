import { fireEvent, screen } from "@testing-library/react-native";

import {
	FilterByCategory,
	type FilterByCategoryProps,
} from "./FilterByCategory";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

const defaultProps: FilterByCategoryProps = {
	initialValue: "any_name",
	onChange: jest.fn(),
};
const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<FilterByCategory {...props} />);

const getFirstOption = () => screen.getAllByTestId("check-option")[0];

describe("<FilterByCategory", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getFirstOption()).toBeTruthy();
			expect(screen.getAllByTestId("check-option")).toHaveLength(3);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the onChange function passing the value of the pressed exercise", () => {
				renderComponent();

				const { onChange } = defaultProps;
				const el = getFirstOption();
				fireEvent.press(el);

				expect(onChange).toHaveBeenCalled();
				expect(onChange).toHaveBeenCalledWith([
					ExerciseCategoryEntity.Breathing,
				]);
			});
		});
	});
});
