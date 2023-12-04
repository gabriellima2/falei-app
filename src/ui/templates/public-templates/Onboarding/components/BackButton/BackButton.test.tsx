import { fireEvent, screen } from "@testing-library/react-native";

import { BackButton, BackButtonProps } from "./BackButton";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: BackButtonProps = {
	disabled: false,
	onBackPress: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<BackButton {...props} />);

describe("<BackButton", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const getButtonEl = () => screen.getByLabelText("Voltar");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getButtonEl()).toBeTruthy();
			expect(screen.getByText("Voltar")).toBeTruthy();
			expect(screen.getByHintText("Move para o item anterior")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the 'onBackPress' function when pressed and 'disabled' is false", () => {
				renderComponent();

				const button = getButtonEl();
				fireEvent.press(button);

				expect(defaultProps.onBackPress).toHaveBeenCalledTimes(1);
			});
			it("should not call the 'onBackPress' function when pressed and 'disabled' is true", () => {
				renderComponent({ ...defaultProps, disabled: true });

				const button = getButtonEl();
				fireEvent.press(button);

				expect(defaultProps.onBackPress).not.toHaveBeenCalled();
			});
		});
	});
});
