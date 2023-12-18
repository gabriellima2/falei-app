import { BreathingExerciseService } from "@/services/breathing-exercise.service";

import { makeAppointmentRepositoryImpl } from "../repositories/make-appointment-repository-impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";

export const makeBreathingExerciseService = () => {
	return new BreathingExerciseService({
		repositories: {
			exercise: makeExerciseRepositoryImpl(),
			appointment: makeAppointmentRepositoryImpl(),
		},
	});
};
