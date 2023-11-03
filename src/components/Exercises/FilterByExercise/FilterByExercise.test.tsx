import { fireEvent, screen } from "@testing-library/react-native";

import {
	FilterByExercise,
	type FilterByExerciseProps,
} from "./FilterByExercise";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: FilterByExerciseProps = {
	exercises: [{ name: "any_name", value: "any_value" }],
	onChange: jest.fn(),
};
const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<FilterByExercise {...props} />);

const getFirstOption = () => screen.getByText(defaultProps.exercises[0].name);

describe("<FilterByExercise", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { exercises } = defaultProps;

			expect(getFirstOption()).toBeTruthy();
			expect(screen.getAllByTestId("check-option")).toHaveLength(
				exercises.length
			);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the onChange function passing the value of the pressed exercise", () => {
				renderComponent();

				const {
					onChange,
					exercises: [item],
				} = defaultProps;
				const el = getFirstOption();
				fireEvent.press(el);

				expect(onChange).toHaveBeenCalled();
				expect(onChange).toHaveBeenCalledWith(item.value);
			});
		});
	});
});
