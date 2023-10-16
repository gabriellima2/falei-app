import { fireEvent, screen } from "@testing-library/react-native";

import {
	BreathingExerciseAppointment,
	type BreathingExerciseAppointmentProps,
} from "./BreathingExerciseAppointment";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: BreathingExerciseAppointmentProps = {
	title: "any_title",
	scheduled_at: { days: ["Terça"], hour: "17:00" },
	rounds: {
		duration_per_round_in_min: 10,
		rounds_completed: 0,
		rounds_total: 3,
	},
};
const renderComponent = (
	props: BreathingExerciseAppointmentProps = defaultProps
) => renderWithThemeProvider(<BreathingExerciseAppointment {...props} />);

describe("<BreathingExerciseAppointment />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { title, rounds, scheduled_at } = defaultProps;
			const dateText = `${scheduled_at.days[0]} - ${scheduled_at.hour}`;
			const roundsText = `${rounds.rounds_total} Rounds`;
			const durationText = `${rounds.duration_per_round_in_min} Min.`;

			expect(screen.getByText(title)).toBeTruthy();
			expect(screen.getByText(dateText)).toBeTruthy();
			expect(screen.getByText(roundsText)).toBeTruthy();
			expect(screen.getByText(durationText)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			const mockOnPress = jest.fn();
			it("call the onPress function when pressed", () => {
				renderComponent({
					...defaultProps,
					onPress: mockOnPress,
				});

				const el = screen.getByTestId("exercise-reminder");
				fireEvent.press(el);

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
