import { BaseExerciseEntity } from "./base-exercise.entity";

interface ReadExerciseCredits {
	author: string;
	work_name: string;
}

export class ReadExerciseEntity extends BaseExerciseEntity {
	constructor(
		id: string,
		user_id: string,
		public readonly content: string,
		public readonly credits: ReadExerciseCredits
	) {
		super(id, user_id);
	}
}
