import { useQuery } from "react-query";

import { makeExerciseRepositoryImpl } from "@/factories/repositories/make-exercise-repository-impl";

import type { ReadExerciseCategory } from "@/@types/exercise-type-categories";
import type { ReadExerciseEntity } from "@/entities/read-entities";

type Options = {
	enabled?: boolean;
};

const repository = makeExerciseRepositoryImpl();

export function useGetReadExerciseById(
	id: string,
	category: ReadExerciseCategory,
	options?: Options
) {
	return useQuery(
		["read-exercise", id],
		() =>
			repository.getById<ReadExerciseEntity>({
				id,
				category,
			}),
		{ ...options }
	);
}
