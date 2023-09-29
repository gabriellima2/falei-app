import { fireEvent, screen } from "@testing-library/react-native";

import {
	ExerciseReminder,
	type ExerciseReminderProps,
} from "./ExerciseReminder";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import type { BreathingExerciseRounds, ScheduledAt } from "@/entities";

const EXERCISE_TITLE = "any_title";
const SCHEDULED_AT: ScheduledAt = { days: ["Terça"], hour: "17:00" };
const ROUNDS: BreathingExerciseRounds = {
	duration_per_round_in_min: 10,
	rounds_completed: 0,
	rounds_total: 3,
};

const defaultProps: ExerciseReminderProps = {
	title: EXERCISE_TITLE,
	scheduled_at: SCHEDULED_AT,
	rounds: ROUNDS,
};
const renderComponent = (props: ExerciseReminderProps = defaultProps) =>
	renderWithThemeProvider(<ExerciseReminder {...props} />);

const getExerciseReminderEl = () => screen.getByTestId("exercise-reminder");

describe("<ExerciseReminder />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("Render", () => {
		function expectExerciseReminderToBePresent() {
			expect(screen.getByText(EXERCISE_TITLE)).toBeTruthy();
			expect(
				screen.getByText(`${SCHEDULED_AT.days[0]} - ${SCHEDULED_AT.hour}`)
			).toBeTruthy();
			expect(screen.getByText(`${ROUNDS.rounds_total} Rounds`)).toBeTruthy();
			expect(
				screen.getByText(`${ROUNDS.duration_per_round_in_min} Min.`)
			).toBeTruthy();
		}

		it("should render correctly when not on scheduled date", () => {
			renderComponent();

			expectExerciseReminderToBePresent();
			expect(screen.getByLabelText("Próximo lembrete")).toBeTruthy();
		});
		it("should render correctly when it's on the scheduled date", () => {
			renderComponent({ ...defaultProps, isOnScheduledDate: true });

			expectExerciseReminderToBePresent();
			expect(screen.getByLabelText("Fazer exercício")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("Press on ExerciseReminder element", () => {
				const mockOnPress = jest
					.fn()
					.mockImplementation(() => console.log("hello"));
				it("should not call the onPress function when it is not on the scheduled date", () => {
					renderComponent({ ...defaultProps, onPress: mockOnPress });

					const el = getExerciseReminderEl();
					fireEvent.press(el);

					expect(mockOnPress).not.toHaveBeenCalled();
				});
				it("call the onPress function when it is on the scheduled date", () => {
					renderComponent({
						...defaultProps,
						onPress: mockOnPress,
						isOnScheduledDate: true,
					});

					const el = getExerciseReminderEl();
					fireEvent.press(el);

					expect(mockOnPress).toHaveBeenCalled();
					expect(mockOnPress).toHaveBeenCalledTimes(1);
				});
			});
		});
	});
});
