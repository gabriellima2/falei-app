import { BaseExerciseEntity } from "./base-exercise.entity";

export interface BreathingExerciseRounds {
	rounds_total: number;
	rounds_completed: number;
	duration_per_round_in_min: number;
}

export class BreathingExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: string,
		public readonly title: string,
		public readonly rounds: BreathingExerciseRounds
	) {
		super(id, user_id);
	}
}
