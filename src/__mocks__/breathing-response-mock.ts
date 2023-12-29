import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

export const breathingResponseMock = {
	appointments: [
		{
			id: "appointment_1",
			title: "any_title_schedule_1",
			scheduledAt: { days: [2], hour: 18, minutes: 0 },
			rounds: {},
		},
	] as BreathingAppointmentEntity[],
	exercises: [
		{
			id: "exercise_1",
			title: "any_title_exercise",
			rounds: {
				completed: 1,
				total: 3,
				durationPerRoundInSec: 10,
			},
		},
		{
			id: "exercise_2",
			title: "any_title_exercise",
			rounds: {
				completed: 3,
				total: 3,
				durationPerRoundInSec: 10,
			},
		},
	] as BreathingExerciseEntity[],
};
