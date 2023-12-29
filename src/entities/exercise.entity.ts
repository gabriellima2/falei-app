import { ExerciseCategoryEntity } from "./exercise-category.entity";

export interface ExerciseEntity {
	readonly id: string;
	readonly userID: string | null;
	readonly category: ExerciseCategoryEntity;
}
