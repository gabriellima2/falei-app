import { BaseExerciseRepositoryImpl } from ".";
import { BreathingExerciseEntity } from "@/entities";

export class BreathingExerciseRepositoryImpl extends BaseExerciseRepositoryImpl<BreathingExerciseEntity> {
	constructor() {
		super("breathing_exercises");
	}
}
