import { useState } from "react";

import { useGetExercisesByCategory } from "@/hooks/use-get-exercises-by-category";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ExerciseEntity } from "@/entities/exercise.entity";

type UseExercisesStateReturn = {
	exercises: ExerciseEntity[] | undefined;
	error: unknown;
	isLoading: boolean;
	category: ExerciseCategoryEntity;
	handleCategoryChange: (value: ExerciseCategoryEntity) => void;
};

export function useExercisesState(): UseExercisesStateReturn {
	const [category, setCategory] = useState<ExerciseCategoryEntity>(
		ExerciseCategoryEntity.Breathing
	);
	const { data, error, isLoading } = useGetExercisesByCategory(category);

	const handleCategoryChange = (value: ExerciseCategoryEntity) => {
		if (!value) return;
		setCategory(value);
	};

	return {
		exercises: data,
		error,
		isLoading,
		category,
		handleCategoryChange,
	};
}
