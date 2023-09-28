import { GenericExerciseEntity } from "./generic-exercise.entity";
import { UserEntity } from "./user-entity";

interface Credits {
	author: string;
	work_name: string;
}

export class ReadExerciseEntity extends GenericExerciseEntity {
	constructor(
		id: string,
		user_id: Pick<UserEntity, "id">,
		public readonly content: string,
		public readonly credits: Credits
	) {
		super(id, user_id);
	}
}
