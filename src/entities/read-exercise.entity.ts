import { BaseExerciseEntity } from "./base-exercise.entity";
import type { UserEntity } from "./user-entity";

interface ReadExerciseCredits {
	author: string;
	work_name: string;
}

export class ReadExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		public readonly content: string,
		public readonly credits: ReadExerciseCredits
	) {
		super(id, user_id);
	}
}
