import { BaseExerciseEntity } from "./base-exercise.entity";

export interface ScheduledAt {
	days: string[];
	hour: string;
}

export class BaseScheduledExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: string,
		public readonly exercise_id: string,
		public readonly scheduled_at: ScheduledAt
	) {
		super(id, user_id);
	}
}
