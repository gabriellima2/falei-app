import { fireEvent, screen } from "@testing-library/react-native";

import {
	ToggleVisibiltyButton,
	type ToggleVisibiltyButtonProps,
} from "./ToggleVisibilityButton";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: ToggleVisibiltyButtonProps = {
	isVisible: false,
	onPress: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<ToggleVisibiltyButton {...props} />);

describe("<ToggleVisibiltyButton />", () => {
	const getButtonEl = () => screen.getByRole("button");

	describe("Render", () => {
		function expectButtonElHasTheCorrectProps(params: { isVisible: boolean }) {
			const { isVisible } = params;
			const labelText = isVisible ? "Ocultar senha" : "Mostrar senha";

			expect(screen.getByLabelText(labelText)).toBeTruthy();
			expect(screen.getByRole("button", { selected: isVisible })).toBeTruthy();
			expect(
				screen.queryByAccessibilityHint("Alterna a visibilidade da senha")
			).toBeTruthy();
		}

		it("should render correctly with 'is-visible' false", () => {
			renderComponent();

			expect(getButtonEl()).toBeTruthy();
			expectButtonElHasTheCorrectProps({ isVisible: false });
		});
		it("should render correctly with 'is-visible' true", () => {
			renderComponent({ ...defaultProps, isVisible: true });

			expect(getButtonEl()).toBeTruthy();
			expectButtonElHasTheCorrectProps({ isVisible: true });
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the on-press function when pressed", () => {
				renderComponent();

				const buttonEl = getButtonEl();
				fireEvent.press(buttonEl);

				expect(defaultProps.onPress).toHaveBeenCalled();
				expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
