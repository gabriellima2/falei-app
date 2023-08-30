import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { Progress } from "./Progress";
import { screen } from "@testing-library/react-native";

const PROGRESS_VALUE = "50%";
const renderComponent = () =>
	renderWithThemeProvider(<Progress value={PROGRESS_VALUE} />);

describe("<Progress />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const currentProgressEl = screen.getByTestId("current-progress");

			expect(currentProgressEl.props.style[0].width).toBe(PROGRESS_VALUE);
		});
	});
});
