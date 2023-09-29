import { BaseExerciseEntity } from "./base-exercise.entity";

interface ReadExerciseCredits {
	author: string;
	work_name: string;
}

export interface ReadExerciseEntity extends BaseExerciseEntity {
	readonly content: string;
	readonly credits: ReadExerciseCredits;
}
