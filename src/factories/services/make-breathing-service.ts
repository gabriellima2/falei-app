import { BreathingServiceImpl } from "@/services/impl/breathing.service.impl";

import { makeAppointmentRepositoryImpl } from "../repositories/make-appointment-repository-impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";
import { makeNotificationAdapter } from "../adapters/make-notification-adapter";

export const makeBreathingService = () => {
	return new BreathingServiceImpl({
		repositories: {
			exercise: makeExerciseRepositoryImpl(),
			appointment: makeAppointmentRepositoryImpl(),
		},
		notification: makeNotificationAdapter(),
	});
};
