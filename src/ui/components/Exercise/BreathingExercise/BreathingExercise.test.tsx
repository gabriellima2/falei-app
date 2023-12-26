import { fireEvent, screen } from "@testing-library/react-native";

import {
	BreathingExercise,
	type BreathingExerciseProps,
} from "./BreathingExercise";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

import { START_EXERCISE_PATHNAME } from "@/constants/start-exercise-pathname";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { mockPush } from "jest-setup";

const defaultProps = {
	id: "1",
	title: "any_title",
	rounds: {
		duration_per_round_in_sec: 20,
		rounds_completed: 0,
		rounds_total: 4,
	},
} as BreathingExerciseProps;

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<BreathingExercise {...props} />);

describe("<BreathingExercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { rounds, title } = defaultProps;
			const ROUNDS_TEXT = `${rounds.rounds_total} Rounds`;
			const DURATION_TEXT = `${rounds.duration_per_round_in_sec} Min.`;

			expect(screen.getByText(title)).toBeTruthy();
			expect(screen.getByText(ROUNDS_TEXT)).toBeTruthy();
			expect(screen.getByText(DURATION_TEXT)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the router method with correct params when press", () => {
				renderComponent();

				const { title, id } = defaultProps;
				const el = screen.getByLabelText(title);
				fireEvent.press(el);

				expect(mockPush).toHaveBeenCalledTimes(1);
				expect(mockPush).toHaveBeenCalledWith({
					pathname: START_EXERCISE_PATHNAME,
					params: { id, category: ExerciseCategoryEntity.Breathing },
				});
			});
		});
	});
});
