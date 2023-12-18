import { useState } from "react";

import {
	useGetExercisesByCategory,
	useFindIncompleteBreathingExercises,
} from "@/hooks";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { ExerciseEntity } from "@/entities/exercise.entity";
import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

type UseExercisesStateParams = {
	initialCategory: ExerciseCategoryEntity;
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
	const { initialCategory, exercises, appointments } = params;
	const [category, setCategory] =
		useState<ExerciseCategoryEntity>(initialCategory);
	const { data, error, isLoading } = useGetExercisesByCategory(category);
	const incompleteExercises = useFindIncompleteBreathingExercises({
		exercises,
		appointments,
	});

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
