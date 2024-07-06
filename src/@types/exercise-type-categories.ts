import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

export type ReadExerciseCategory =
	| ExerciseCategoryEntity.Poem
	| ExerciseCategoryEntity.TongueTwister;
