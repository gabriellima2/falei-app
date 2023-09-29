import { makeBreathingExerciseRepositoryImpl } from "@/factories/repositories/make-breathing-exercise-repository-impl";
import { BaseScheduledExerciseRepositoryImpl } from "./base-scheduled-exercise.repository.impl";

import type {
	BreathingExerciseEntity,
	ScheduledBreathingExerciseEntity,
} from "@/entities";

export class ScheduledBreathingExerciseRepositoryImpl extends BaseScheduledExerciseRepositoryImpl<
	ScheduledBreathingExerciseEntity,
	BreathingExerciseEntity
> {
	constructor() {
		super(makeBreathingExerciseRepositoryImpl(), "breathing_exercises");
	}
}
