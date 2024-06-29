import { BreathingServiceImpl } from "@/services/impl/breathing.service.impl";

import { makeAppointmentRepositoryImpl } from "../repositories/make-appointment-repository-impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";
import { makeReminderService } from "./make-reminder-service";

export const makeBreathingService = () => {
	return new BreathingServiceImpl({
		repositories: {
			exercise: makeExerciseRepositoryImpl(),
			appointment: makeAppointmentRepositoryImpl(),
		},
		reminder: makeReminderService(),
	});
};
