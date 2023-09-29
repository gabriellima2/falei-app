import { BaseExerciseEntity } from "./base-exercise.entity";
import { UserEntity } from "./user-entity";

interface Credits {
	author: string;
	work_name: string;
}

export class ReadExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		public readonly content: string,
		public readonly credits: Credits
	) {
		super(id, user_id);
	}
}
