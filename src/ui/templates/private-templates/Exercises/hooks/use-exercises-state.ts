import { useState } from "react";

import { useGetExercisesByCategory } from "@/hooks/use-get-exercises-by-category";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ExerciseEntity } from "@/entities/exercise.entity";
import {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";
import { useFindIncompleteBreathingExercises } from "@/hooks";

type UseExercisesStateParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingAppointmentEntity[];
};

export type UseExercisesStateReturn = {
	exercises: ExerciseEntity[] | undefined;
	incompleteExercises: ExerciseEntity[] | undefined;
	error: unknown;
	isLoading: boolean;
	category: ExerciseCategoryEntity;
	handleCategoryChange: (value: ExerciseCategoryEntity) => void;
};

export function useExercisesState(
	params: UseExercisesStateParams
): UseExercisesStateReturn {
	const { exercises, appointments } = params;
	const incompleteExercises = useFindIncompleteBreathingExercises({
		exercises,
		appointments,
	});
	const [category, setCategory] = useState<ExerciseCategoryEntity>(
		ExerciseCategoryEntity.Incomplete
	);
	const { data, error, isLoading } = useGetExercisesByCategory(category);

	const handleCategoryChange = (value: ExerciseCategoryEntity) => {
		if (!value) return;
		setCategory(value);
	};

	return {
		exercises: data,
		incompleteExercises,
		error,
		isLoading,
		category,
		handleCategoryChange,
	};
}
