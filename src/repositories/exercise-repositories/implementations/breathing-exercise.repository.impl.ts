import { BaseExerciseRepositoryImpl } from "./base-exercise.repository.impl";
import type { BreathingExerciseEntity } from "@/entities";

export class BreathingExerciseRepositoryImpl extends BaseExerciseRepositoryImpl<BreathingExerciseEntity> {
	constructor() {
		super("breathing_exercises");
	}
}
