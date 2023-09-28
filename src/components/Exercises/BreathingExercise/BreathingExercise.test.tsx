import { fireEvent, screen } from "@testing-library/react-native";

import {
	BreathingExercise,
	PATHNAME_START_EXERCISE,
	type BreathingExerciseProps,
} from "./BreathingExercise";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockPush } from "jest-setup";

const defaultProps: BreathingExerciseProps = {
	id: "1",
	title: "any_title",
	rounds: {
		duration_per_round_in_min: 20,
		rounds_completed: 0,
		rounds_total: 4,
	},
};

const renderComponent = (props: BreathingExerciseProps = defaultProps) =>
	renderWithThemeProvider(<BreathingExercise {...props} />);

describe("<BreathingExercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const repetitionsPhrase = `${defaultProps.rounds.rounds_total} Rounds`;
			const durationPhrase = `${defaultProps.rounds.duration_per_round_in_min} Min.`;

			expect(screen.getByText(defaultProps.title)).toBeTruthy();
			expect(screen.getByText(repetitionsPhrase)).toBeTruthy();
			expect(screen.getByText(durationPhrase)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the router method with correct params when press", () => {
				renderComponent();

				const el = screen.getByLabelText(defaultProps.title);
				fireEvent.press(el);

				expect(mockPush).toHaveBeenCalledTimes(1);
				expect(mockPush).toHaveBeenCalledWith({
					pathname: PATHNAME_START_EXERCISE,
					params: { id: defaultProps.id },
				});
			});
		});
	});
});
