import { screen } from "@testing-library/react-native";

import {
	BreathingAppointments,
	type BreathingAppointmentsProps,
} from "./BreathingAppointments";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockAppointment } from "../../../../../components/Appointment/BreathingAppointment/__mocks__/mock-appointment";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

const renderComponent = (props: BreathingAppointmentsProps) =>
	renderWithThemeProvider(<BreathingAppointments {...props} />);

describe("<BreathingAppointments />", () => {
	describe("Render", () => {
		it("should render correctly listing the appointments data", () => {
			const appointments = [mockAppointment as BreathingAppointmentEntity];
			renderComponent({ appointments });

			expect(
				screen.getAllByTestId("breathing-exercise-appointment").length
			).toBe(appointments.length);
		});
		describe("Empty", () => {
			const cases = [[], undefined];
			test.each(cases)("should render correctly with empty data", (param) => {
				renderComponent({
					appointments: param as unknown as BreathingAppointmentEntity[],
				});

				expect(screen.getByTestId("empty-data-message")).toBeTruthy();
			});
		});
	});
});
