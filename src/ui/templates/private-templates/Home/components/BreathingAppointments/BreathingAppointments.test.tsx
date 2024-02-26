import { screen } from "@testing-library/react-native";

import {
	BreathingAppointments,
	type BreathingAppointmentsProps,
} from "./BreathingAppointments";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

const defaultProps: BreathingAppointmentsProps = {
	appointments: [
		{
			id: "1",
			title: "any_title",
			scheduledAt: { days: [2], hour: 17, minutes: 0 },
			rounds: {
				completed: 0,
				total: 3,
			},
			steps: {
				inhale: 5,
				hold: 3,
				exhale: 5,
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
