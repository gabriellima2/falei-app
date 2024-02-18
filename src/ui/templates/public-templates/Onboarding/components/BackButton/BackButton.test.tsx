import { fireEvent, screen } from "@testing-library/react-native";

import { BackButton, BackButtonProps } from "./BackButton";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

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
			const cases = [
				{
					description:
						"should call the 'onBackPress' function when pressed and 'disabled' is false",
					props: defaultProps,
				},
				{
					description:
						"should not call the 'onBackPress' function when pressed and 'disabled' is true",
					props: { ...defaultProps, disabled: true },
				},
			];
			test.each(cases)("%s", ({ props }) => {
				renderComponent(props);

				const button = getButtonEl();
				fireEvent.press(button);

				if (props.disabled) {
					expect(defaultProps.onBackPress).not.toHaveBeenCalled();
				}
				if (!props.disabled) {
					expect(props.onBackPress).toHaveBeenCalledTimes(1);
				}
			});
		});
	});
});
