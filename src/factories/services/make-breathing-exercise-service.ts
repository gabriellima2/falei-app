import { BreathingExerciseServiceImpl } from "@/services/impl/breathing-exercise.service.impl";

import { makeAppointmentRepositoryImpl } from "../repositories/make-appointment-repository-impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";
import { makeNotificationAdapter } from "../adapters/make-notification-adapter";

export const makeBreathingExerciseService = () => {
	return new BreathingExerciseServiceImpl({
		repositories: {
			exercise: makeExerciseRepositoryImpl(),
			appointment: makeAppointmentRepositoryImpl(),
		},
		notification: makeNotificationAdapter(),
	});
};
