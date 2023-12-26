import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

export const breathingResponseMock = {
	appointments: [
		{
			id: "appointment_1",
			title: "any_title_schedule_1",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[2]], hour: "18:00" },
			rounds: {},
		},
	] as BreathingAppointmentEntity[],
	exercises: [
		{
			id: "exercise_1",
			title: "any_title_exercise",
			rounds: {
				rounds_completed: 1,
				rounds_total: 3,
				duration_per_round_in_sec: 10,
			},
		},
		{
			id: "exercise_2",
			title: "any_title_exercise",
			rounds: {
				rounds_completed: 3,
				rounds_total: 3,
				duration_per_round_in_sec: 10,
			},
		},
	] as BreathingExerciseEntity[],
};
