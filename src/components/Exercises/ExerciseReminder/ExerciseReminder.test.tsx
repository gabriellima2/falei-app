import { fireEvent, screen } from "@testing-library/react-native";

import {
	ExerciseReminder,
	type ExerciseReminderProps,
} from "./ExerciseReminder";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const EXERCISE_NAME = "any_name";
const SCHEDULED_AT = "Ter - 17:00h";
const REPETITIONS = 1;
const DURATION_IN_MIN = 18;

const defaultProps: ExerciseReminderProps = {
	name: EXERCISE_NAME,
	scheduledAt: SCHEDULED_AT,
	repetitions: REPETITIONS,
	durationInMin: DURATION_IN_MIN,
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
			expect(screen.getByText(EXERCISE_NAME)).toBeTruthy();
			expect(screen.getByText(SCHEDULED_AT)).toBeTruthy();
			expect(screen.getByText(`${REPETITIONS} Rounds`)).toBeTruthy();
			expect(screen.getByText(`${DURATION_IN_MIN} Min.`)).toBeTruthy();
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
