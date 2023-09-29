import type { BaseScheduledExerciseEntity } from "./base-scheduled-exercise.entity";
import type { BreathingExerciseEntity } from "./breathing-exercise.entity";

export type ScheduledBreathingExerciseEntity = BaseScheduledExerciseEntity &
	BreathingExerciseEntity;
