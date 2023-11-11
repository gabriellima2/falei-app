import { useQuery } from "react-query";

import { makeExerciseRepositoryImpl } from "@/factories/repositories/make-exercise-repository-impl";
import type { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

const repository = makeExerciseRepositoryImpl();

export function useGetExercisesByCategory(category: ExerciseCategoryEntity) {
	return useQuery(["exercises", category], () =>
		repository.getAll({
			category,
		})
	);
}
