import { fireEvent, screen } from "@testing-library/react-native";

import { Appointment, type AppointmentProps } from "./Appointment";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockAppointment } from "../__mocks__/mock-appointment";

const defaultProps: AppointmentProps = mockAppointment;

const renderComponent = (props: AppointmentProps = defaultProps) =>
	renderWithThemeProvider(<Appointment {...props} />);

describe("<Appointment />", () => {
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

				const el = screen.getByTestId("breathing-exercise-appointment");
				fireEvent.press(el);

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
