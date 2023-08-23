import { fireEvent, screen } from "@testing-library/react-native";

import {
	ExerciseReminder,
	type ExerciseReminderProps,
} from "./ExerciseReminder";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const EXERCISE_TITLE = "any_title";
const SCHEDULED_AT = { day: "Ter", hour: "17:00" };
const ROUNDS = 1;
const DURATION_TIME = 18;

const defaultProps: ExerciseReminderProps = {
	title: EXERCISE_TITLE,
	scheduledAt: SCHEDULED_AT,
	rounds: ROUNDS,
	durationTime: DURATION_TIME,
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
				screen.getByText(`${SCHEDULED_AT.day} - ${SCHEDULED_AT.hour}h`)
			).toBeTruthy();
			expect(screen.getByText(`${ROUNDS} Rounds`)).toBeTruthy();
			expect(screen.getByText(`${DURATION_TIME} Min.`)).toBeTruthy();
		}

		it("should render correctly when not on scheduled date", () => {
			renderComponent();

			expectExerciseReminderToBePresent();
			expect(screen.getByLabelText("Próximo lembrete")).toBeTruthy();
		});
		it("should render correctly when it's on the scheduled date", () => {
			renderComponent({ ...defaultProps, isOnTheScheduledDate: true });

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
						isOnTheScheduledDate: true,
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
