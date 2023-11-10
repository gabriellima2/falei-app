import { renderHook } from "@testing-library/react-hooks";

import { useHome } from "./use-home";
import * as useFilteredAppointments from "@/hooks/use-filtered-appointments";
import * as useIncompleteBreathingExercises from "@/hooks/use-incomplete-breathing-exercises";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

const useFilteredAppointmentsSpyOn = jest.spyOn(
	useFilteredAppointments,
	"useFilteredAppointments"
);
const useIncompleteBreathingExercisesSpyOn = jest.spyOn(
	useIncompleteBreathingExercises,
	"useIncompleteBreathingExercises"
);

export const mock = {
	appointments: [
		{
			id: "1",
			title: "any_title_schedule_1",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[2]], hour: "18:00" },
			rounds: {},
		},
	] as BreathingAppointmentEntity[],
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

const executeHook = () => renderHook(() => useHome(mock));

describe("UseHome", () => {
	it("should return correctly with values", () => {
		useFilteredAppointmentsSpyOn.mockReturnValue(mock.appointments);
		useIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(mock.exercises);
		useIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(mock.appointments);

		const { result } = executeHook();

		expect(result.current.title).toBeTruthy();
		expect(result.current.incomplete).toMatchObject(mock);
		expect(result.current.filteredAppointments).toMatchObject(
			mock.appointments
		);
	});
	it("should return correctly when hooks return undefined", () => {
		useFilteredAppointmentsSpyOn.mockReturnValue([]);
		useIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(undefined);
		useIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(undefined);

		const { result } = executeHook();

		expect(result.current.title).toBe("Torne um exercício parte de sua rotina");
		expect(result.current.filteredAppointments).toMatchObject([]);
		expect(result.current.incomplete).toMatchObject({
			appointments: undefined,
			exercises: undefined,
		});
	});
});
