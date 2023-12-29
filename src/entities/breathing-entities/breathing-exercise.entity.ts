import { ExerciseEntity } from "../exercise.entity";

export interface BreathingExerciseRounds {
	total: number;
	completed: number;
	durationPerRoundInSec: number;
}

export interface BreathingExerciseEntity extends ExerciseEntity {
	readonly title: string;
	readonly rounds: BreathingExerciseRounds;
	readonly lastProgressAt: { nanoseconds: number; seconds: number };
}
