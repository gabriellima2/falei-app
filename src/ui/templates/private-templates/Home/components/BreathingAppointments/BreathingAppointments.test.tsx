import { screen } from "@testing-library/react-native";

import {
	BreathingAppointments,
	type BreathingAppointmentsProps,
} from "./BreathingAppointments";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

const defaultProps: BreathingAppointmentsProps = {
	appointments: [
		{
			id: "1",
			title: "any_title",
			scheduled_at: { days: ["Terça"], hour: "17:00" },
			rounds: {
				duration_per_round_in_sec: 10,
				rounds_completed: 0,
				rounds_total: 3,
			},
		} as BreathingAppointmentEntity,
	],
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<BreathingAppointments {...props} />);

describe("<BreathingAppointments />", () => {
	describe("Render", () => {
		it("should render correctly listing the appointments data", () => {
			renderComponent();

			const { appointments } = defaultProps;

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
