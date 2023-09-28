import { GenericExerciseEntity } from "./generic-exercise.entity";
import { UserEntity } from "./user-entity";

export interface Rounds {
	rounds_total: number;
	rounds_completed: number;
	duration_per_round_in_min: number;
}

export class BreathingExerciseEntity extends GenericExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		public readonly title: string,
		public readonly rounds: Rounds
	) {
		super(id, user_id);
	}
}
