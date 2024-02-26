import { ExerciseEntity } from "../exercise.entity";

export interface BreathingRounds {
	total: number;
	completed: number;
}

export interface BreathingSteps {
	inhale: number;
	hold: number;
	exhale: number;
}

export interface BreathingExerciseEntity extends ExerciseEntity {
	readonly title: string;
	readonly rounds: BreathingRounds;
	readonly steps: BreathingSteps;
	readonly lastProgressAt: { nanoseconds: number; seconds: number } | null;
}
