import { makeBreathingExerciseRepositoryImpl } from "@/factories/repositories/make-breathing-exercise-repository-impl";
import { BaseAppointmentRepositoryImpl } from "./base-appointment.repository.impl";

import type {
	BreathingExerciseAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities";

export class BreathingExerciseAppointmentRepositoryImpl extends BaseAppointmentRepositoryImpl<
	BreathingExerciseAppointmentEntity,
	BreathingExerciseEntity
> {
	constructor() {
		super(makeBreathingExerciseRepositoryImpl(), "breathing_exercises");
	}
}
