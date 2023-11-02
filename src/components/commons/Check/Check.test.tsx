import { fireEvent, screen } from "@testing-library/react-native";

import { Check, type CheckProps } from "./Check";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: CheckProps = {
	initialValue: "any_value_1",
	items: [
		{
			name: "any_name_1",
			value: "any_value_1",
		},
		{
			name: "any_name_2",
			value: "any_value_2",
		},
	],
	onChange: jest.fn(),
};
const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<Check {...props} />);

describe("<Check />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const itemsLength = defaultProps.items.length;

			expect(screen.getAllByTestId("check-option")).toHaveLength(itemsLength);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the onChange function when pressed", () => {
				renderComponent();

				const el = screen.getAllByTestId("check-option")[0];
				fireEvent.press(el);

				expect(defaultProps.onChange).toHaveBeenCalled();
				expect(defaultProps.onChange).toHaveBeenCalledWith([
					defaultProps.items[0].value,
				]);
			});
			it("should call the onChange function when pressed", () => {
				renderComponent({ ...defaultProps, multipleValues: true });

				const el = screen.getAllByTestId("check-option")[1];
				fireEvent.press(el);

				expect(defaultProps.onChange).toHaveBeenCalled();
				expect(defaultProps.onChange).toHaveBeenCalledWith([
					defaultProps.items[0].value,
					defaultProps.items[1].value,
				]);
			});
		});
	});
});
