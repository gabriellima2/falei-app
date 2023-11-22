import { LoadingIndicator, TextError, Header } from "@/components";
import { ExerciseList, FilterByCategory } from "./components";

import { useExercises } from "./hooks/use-exercises";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

export const Exercises = () => {
	const { exercises, category, error, isLoading, handleCategoryChange } =
		useExercises();
	return (
		<>
			<Header title="Exercícios" />
			<FilterByCategory
				initialValue={ExerciseCategoryEntity.Breathing}
				onChange={([v]) => handleCategoryChange(v as ExerciseCategoryEntity)}
			/>
			{isLoading && <LoadingIndicator />}
			{error && <TextError>{(error as Error).message}</TextError>}
			{!error && exercises && (
				<ExerciseList exercises={exercises} category={category} />
			)}
		</>
	);
};
