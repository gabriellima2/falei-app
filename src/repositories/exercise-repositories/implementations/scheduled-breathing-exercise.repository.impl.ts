import { BaseScheduledExerciseRepositoryImpl } from "./base-scheduled-exercise.repository.impl";
import type { ScheduledBreathingExerciseEntity } from "@/entities";

export class ScheduledBreathingExerciseRepositoryImpl extends BaseScheduledExerciseRepositoryImpl<ScheduledBreathingExerciseEntity> {
	constructor() {
		super("breathing_exercises");
	}
}
