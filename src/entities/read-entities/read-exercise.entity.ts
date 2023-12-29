import { ExerciseEntity } from "../exercise.entity";

export interface ReadExerciseEntity extends ExerciseEntity {
	readonly content: string;
	readonly credits: {
		author: string | null;
		workName: string;
	};
}
