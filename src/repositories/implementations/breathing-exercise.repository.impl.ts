import { GenericExerciseRepositoryImpl } from ".";
import { BreathingExerciseEntity } from "@/entities";

export class BreathingExerciseRepositoryImpl extends GenericExerciseRepositoryImpl<BreathingExerciseEntity> {
	constructor() {
		super("breathing_exercises");
	}
}
