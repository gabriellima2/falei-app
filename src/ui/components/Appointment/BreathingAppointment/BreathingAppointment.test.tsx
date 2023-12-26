import { fireEvent, screen } from "@testing-library/react-native";

import {
	BreathingAppointment,
	type BreathingAppointmentProps,
} from "./BreathingAppointment";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: BreathingAppointmentProps = {
	title: "any_title",
	scheduled_at: { days: ["Terça"], hour: "17:00" },
	rounds: {
		duration_per_round_in_sec: 10,
		rounds_completed: 0,
		rounds_total: 3,
	},
};

const renderComponent = (props: BreathingAppointmentProps = defaultProps) =>
	renderWithThemeProvider(<BreathingAppointment {...props} />);

describe("<BreathingAppointment />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { title, rounds, scheduled_at } = defaultProps;
			const dateText = `${scheduled_at.days[0]} - ${scheduled_at.hour}`;
			const roundsText = `${rounds.rounds_total} Rounds`;
			const durationText = "30 Seg.";

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

				const el = screen.getByTestId("breathing-exercise-appointment");
				fireEvent.press(el);

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
