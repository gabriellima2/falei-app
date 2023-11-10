import { ExerciseCategoryEntity } from "./exercise-category.entity";

export interface ExerciseEntity {
	readonly id: string;
	readonly user_id?: string;
	readonly category: ExerciseCategoryEntity;
}
