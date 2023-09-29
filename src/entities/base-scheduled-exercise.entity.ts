import { BaseExerciseEntity } from "./base-exercise.entity";
import { UserEntity } from "./user-entity";

export interface ScheduledAt {
	days: string[];
	hour: string;
}

export class BaseScheduledExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		public readonly exercise_id: string,
		public readonly scheduled_at: ScheduledAt
	) {
		super(id, user_id);
	}
}
