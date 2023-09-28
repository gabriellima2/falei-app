import { BreathingExerciseEntity, Rounds } from "./breathing-exercise.entity";
import { UserEntity } from "./user-entity";

export interface ScheduledAt {
	days: string[];
	hour: string;
}

export class ScheduledExerciseEntity extends BreathingExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		title: string,
		rounds: Rounds,
		public readonly exercise_id: string,
		public readonly scheduled_at: ScheduledAt
	) {
		super(id, user_id, title, rounds);
	}
}
