import { screen } from "@testing-library/react-native";

import { Progress, type ProgressProps } from "./Progress";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const renderComponent = (props: ProgressProps) =>
	renderWithThemeProvider(<Progress {...props} />);

describe("<Progress />", () => {
	describe("Render", () => {
		function expectCurrentProgressValueToBe(value: number) {
			const currentProgressEl = screen.getByTestId("current-progress");
			expect(currentProgressEl.props.style[0].width).toBe(`${value}%`);
		}

		it("should render correctly", () => {
			const PROGRESS_VALUE = 50;
			renderComponent({ value: PROGRESS_VALUE });

			expectCurrentProgressValueToBe(PROGRESS_VALUE);
		});
		it("should render correctly when is passed a value greater than one hundred percent", () => {
			const PROGRESS_VALUE = 10000;
			renderComponent({ value: PROGRESS_VALUE });

			expectCurrentProgressValueToBe(100);
		});
	});
});
