import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { DayPicker, type DayPickerProps } from "./DayPicker";

const defaultProps: DayPickerProps = {
	values: [],
	onChange: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<DayPicker {...props} />);

describe("<DayPicker />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getAllByTestId("check-option")).toHaveLength(7);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the on-change function with the name of the pressed option", () => {
				renderComponent();

				const option = screen.getByText("Dom");
				fireEvent.press(option);

				expect(defaultProps.onChange).toHaveBeenCalledWith(
					expect.arrayContaining(["sunday"])
				);
			});
			it("should call the on-change function with the name of the option pressed while keeping the option already selected", () => {
				renderComponent({ ...defaultProps, values: ["monday"] });

				const option = screen.getByText("Dom");
				fireEvent.press(option);

				expect(defaultProps.onChange).toHaveBeenCalledWith(
					expect.arrayContaining(["sunday", "monday"])
				);
			});
			it("should call the on-change function without the name of the already selected option when it is pressed again", () => {
				renderComponent({ ...defaultProps, values: ["monday"] });

				const option = screen.getByText("Seg");
				fireEvent.press(option);

				expect(defaultProps.onChange).toHaveBeenCalledWith(
					expect.arrayContaining([])
				);
			});
		});
	});
});
