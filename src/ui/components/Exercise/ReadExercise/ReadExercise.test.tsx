import { fireEvent, screen } from "@testing-library/react-native";

import {
	ReadExercise,
	type ReadExerciseProps,
	START_READ_EXERCISE_PATHNAME,
} from "./ReadExercise";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockPush } from "jest-setup";

const defaultProps: ReadExerciseProps = {
	id: "1",
	content: "any_content",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<ReadExercise {...props} />);

describe("<ReadExercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText(defaultProps.content)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the router method with correct params when press", () => {
				renderComponent();

				const { id } = defaultProps;
				const el = screen.getByRole("link");
				fireEvent.press(el);

				expect(mockPush).toHaveBeenCalledTimes(1);
				expect(mockPush).toHaveBeenCalledWith({
					pathname: START_READ_EXERCISE_PATHNAME,
					params: { id },
				});
			});
		});
	});
});
