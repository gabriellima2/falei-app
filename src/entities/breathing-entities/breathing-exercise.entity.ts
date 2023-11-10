import { ExerciseEntity } from "../exercise.entity";

export interface BreathingExerciseRounds {
	rounds_total: number;
	rounds_completed: number;
	duration_per_round_in_min: number;
}

export interface BreathingExerciseEntity extends ExerciseEntity {
	readonly title: string;
	readonly rounds: BreathingExerciseRounds;
	readonly last_progress_at: { nanoseconds: number; seconds: number };
}
