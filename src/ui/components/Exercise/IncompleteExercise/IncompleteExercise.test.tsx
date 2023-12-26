import { fireEvent, screen } from "@testing-library/react-native";

import {
	IncompleteExercise,
	type IncompleteExerciseProps,
} from "./IncompleteExercise";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { START_EXERCISE_PATHNAME } from "@/constants/start-exercise-pathname";
import { mockPush } from "jest-setup";

const defaultProps = {
	id: "1",
	title: "any_title",
	rounds: {
		duration_per_round_in_sec: 10,
		rounds_completed: 2,
		rounds_total: 4,
	},
} as IncompleteExerciseProps;

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<IncompleteExercise {...props} />);

describe("<IncompleteExercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { rounds, title } = defaultProps;
			const ROUNDS_TEXT = `${rounds.rounds_completed} / ${rounds.rounds_total} Rounds`;
			const DURATION_TEXT = "40 Seg.";

			expect(screen.getByText(title)).toBeTruthy();
			expect(screen.getByText(ROUNDS_TEXT)).toBeTruthy();
			expect(screen.getByText(DURATION_TEXT)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the router method with correct params when press", () => {
				renderComponent();

				const { title, id, category } = defaultProps;
				const el = screen.getByLabelText(title);
				fireEvent.press(el);

				expect(mockPush).toHaveBeenCalledTimes(1);
				expect(mockPush).toHaveBeenCalledWith({
					pathname: START_EXERCISE_PATHNAME,
					params: { id, category },
				});
			});
		});
	});
});
