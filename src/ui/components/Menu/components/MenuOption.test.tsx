import { fireEvent, screen } from "@testing-library/react-native";

import { MenuOption, type MenuOptionProps } from "./MenuOption";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { FakeIconComponent } from "@/test-utils/fake-icon-component";

const TEXT = "any_text";
const ICON = "any_icon";
const defaultProps: MenuOptionProps = {
	text: TEXT,
};

const renderComponent = (props: MenuOptionProps = defaultProps) =>
	renderWithThemeProvider(<MenuOption {...props} />);

describe("<MenuOption />", () => {
	describe("Render", () => {
		it("should render correctly without icon", () => {
			renderComponent();

			expect(screen.getByText(TEXT)).toBeTruthy();
			expect(screen.queryByText(ICON)).toBeFalsy();
		});
		it("should render correctly with icon", () => {
			renderComponent({
				...defaultProps,
				icon: () => <FakeIconComponent icon={ICON} />,
			});

			expect(screen.getByText(TEXT)).toBeTruthy();
			expect(screen.getByText(ICON)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call onPress function when pressed", () => {
				const mockOnPress = jest.fn();
				renderComponent({ ...defaultProps, onPress: mockOnPress });

				const el = screen.getByText(TEXT);
				fireEvent.press(el);

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
