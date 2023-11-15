import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { useGetExercisesByCategory } from "@/hooks/use-get-exercises-by-category";
import { useState } from "react";

export function useExercises() {
	const [category, setCategory] = useState<ExerciseCategoryEntity>(
		ExerciseCategoryEntity.Breathing
	);
	const { data, error, isLoading } = useGetExercisesByCategory(category);

	const handleCategoryChange = (value: ExerciseCategoryEntity) =>
		setCategory(value);

	return {
		exercises: data,
		error,
		isLoading,
		category,
		handleCategoryChange,
	};
}
