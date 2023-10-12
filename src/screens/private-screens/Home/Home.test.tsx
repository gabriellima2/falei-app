import { screen } from "@testing-library/react-native";
import * as ReactQuery from "react-query";

import { Home } from "./Home";

import { WithQueryClientProvider } from "@/__mocks__/with-query-client-provider";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import * as useFilteredAppointments from "@/hooks/use-filtered-appointments";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import type {
	BreathingExerciseEntity,
	BreathingExerciseAppointmentEntity,
} from "@/entities";

const mockData = {
	appointments: [
		{
			id: "1",
			title: "any_title_schedule_1",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[2]], hour: "18:00" },
			rounds: {},
		},
	] as BreathingExerciseAppointmentEntity[],
	exercises: [
		{
			id: "1",
			title: "any_title_exercise",
			rounds: {
				rounds_completed: 1,
				rounds_total: 3,
				duration_per_round_in_min: 10,
			},
		},
	] as BreathingExerciseEntity[],
};

jest
	.spyOn(ReactQuery, "useQuery")
	.mockImplementation(
		jest.fn().mockReturnValue({ isLoading: false, error: null, data: mockData })
	);

const renderComponent = () =>
	renderWithThemeProvider(
		<WithQueryClientProvider>
			<Home data={mockData} />
		</WithQueryClientProvider>
	);
const getExerciseList = () => screen.queryAllByTestId("list__item");

describe("<Home />", () => {
	describe("Render", () => {
		const useFilteredAppointmentsSpyOn = jest.spyOn(
			useFilteredAppointments,
			"useFilteredAppointments"
		);

		function expectExerciseInProgressToBePresent() {
			const progressEl = screen.getByTestId("current-progress");
			const exercise = mockData.exercises[0];

			expect(screen.getAllByText(exercise.title)[0]).toBeTruthy();
			expect(progressEl.props.width).toBe("33%");
		}
		function expectExerciseListToBePresent() {
			expect(getExerciseList()).toHaveLength(mockData.exercises.length);
		}

		it("should render correctly with appointment exercise", () => {
			const appointment = mockData
				.appointments[0] as BreathingExerciseAppointmentEntity;
			useFilteredAppointmentsSpyOn.mockReturnValue([appointment]);
			renderComponent();

			expect(screen.getByText(appointment.title)).toBeTruthy();
			expectExerciseInProgressToBePresent();
			expectExerciseListToBePresent();
		});
		it("should render correctly without appointment exercise", () => {
			const emptySchedulesMessage = "Não há lembretes para essa semana";
			useFilteredAppointmentsSpyOn.mockReturnValue([]);
			renderComponent();

			expect(screen.getByText(emptySchedulesMessage)).toBeTruthy();
			expectExerciseInProgressToBePresent();
			expectExerciseListToBePresent();
		});
	});
});
