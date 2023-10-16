import { screen } from "@testing-library/react-native";

import {
	BreathingExerciseAppointments,
	type BreathingExerciseAppointmentsProps,
} from "./BreathingExerciseAppointments";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockAppointment } from "./__mocks__/mock-appointment";

import type { BreathingExerciseAppointmentEntity } from "@/entities";

const renderComponent = (props: BreathingExerciseAppointmentsProps) =>
	renderWithThemeProvider(<BreathingExerciseAppointments {...props} />);

describe("<BreathingExerciseAppointments />", () => {
	describe("Render", () => {
		it("should render correctly listing the appointments data", () => {
			const appointments = [
				mockAppointment as BreathingExerciseAppointmentEntity,
			];
			renderComponent({ appointments });

			expect(
				screen.getAllByTestId("breathing-exercise-appointment").length
			).toBe(appointments.length);
		});
		describe("Empty", () => {
			const cases = [[], undefined];
			test.each(cases)("should render correctly with empty data", (param) => {
				renderComponent({
					appointments:
						param as unknown as BreathingExerciseAppointmentEntity[],
				});

				expect(screen.getByTestId("empty-data-message")).toBeTruthy();
			});
		});
	});
});
