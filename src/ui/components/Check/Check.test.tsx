import { fireEvent, screen } from "@testing-library/react-native";

import { Check, type CheckProps } from "./Check";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: CheckProps = {
	values: ["any_value_1"],
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

const getCheckOptions = () => screen.getAllByTestId("check-option");

describe("<Check />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const itemsLength = defaultProps.items.length;

			expect(getCheckOptions()).toHaveLength(itemsLength);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			const { items } = defaultProps;
			const cases = [
				{
					props: defaultProps,
					elIndex: 0,
					expected: [items[0].value],
				},
				{
					props: { ...defaultProps, withMultipleValues: true },
					elIndex: 1,
					expected: [items[0].value, items[1].value],
				},
			];
			test.each(cases)(
				"should call the onChange function when pressed",
				({ props, elIndex, expected }) => {
					renderComponent(props);

					const el = getCheckOptions()[elIndex];
					fireEvent.press(el);

					expect(defaultProps.onChange).toHaveBeenCalled();
					expect(defaultProps.onChange).toHaveBeenCalledWith(expected);
				}
			);
		});
	});
});
