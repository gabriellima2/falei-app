import { BaseScheduledExerciseEntity } from "./base-scheduled-exercise.entity";
import { BreathingExerciseEntity } from "./breathing-exercise.entity";

export interface ScheduledBreathingExerciseEntity
	extends BaseScheduledExerciseEntity,
		Omit<BreathingExerciseEntity, "user_id"> {}
