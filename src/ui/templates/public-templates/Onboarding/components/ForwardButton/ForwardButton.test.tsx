import { fireEvent, screen } from "@testing-library/react-native";

import { ForwardButton, ForwardButtonProps, actions } from "./ForwardButton";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: ForwardButtonProps = {
	action: "next",
	onForwardPress: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<ForwardButton {...props} />);

describe("<ForwardButton />", () => {
	describe("Render", () => {
		const cases = ["next", "continue"] as (keyof typeof actions)[];
		test.each(cases)("should render correctly with '%s' action", (action) => {
			renderComponent({ ...defaultProps, action });
			const attrs = actions[action];

			expect(screen.getByText(attrs.label)).toBeTruthy();
			expect(screen.getByLabelText(attrs.label)).toBeTruthy();
			expect(screen.getByHintText(attrs.hint)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the 'onForwardPress' when pressed", () => {
				renderComponent();

				const button = screen.getByLabelText(actions.next.label);
				fireEvent.press(button);

				expect(defaultProps.onForwardPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
