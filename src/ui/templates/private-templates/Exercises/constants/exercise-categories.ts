import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { categoriesPortuguese } from "@/constants/categories-portuguese";

export const exerciseCategories = [
	{
		name: categoriesPortuguese.incomplete,
		value: ExerciseCategoryEntity.Incomplete,
	},
	{
		name: categoriesPortuguese.breathing_exercises,
		value: ExerciseCategoryEntity.Breathing,
	},
	{
		name: categoriesPortuguese.tongue_twister_exercises,
		value: ExerciseCategoryEntity.TongueTwister,
	},
	{
		name: categoriesPortuguese.poem_exercises,
		value: ExerciseCategoryEntity.Poem,
	},
];
