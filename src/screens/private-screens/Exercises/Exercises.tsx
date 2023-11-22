import {
	LoadingIndicator,
	FilterByExercise,
	TextError,
	Header,
} from "@/components";
import { ExerciseList } from "./components/ExerciseList";

import { useExercises } from "./hooks/use-exercises";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

export const Exercises = () => {
	const { exercises, category, error, isLoading, handleCategoryChange } =
		useExercises();
	return (
		<>
			<Header title="Exercícios" />
			<FilterByExercise
				initialValue={ExerciseCategoryEntity.Breathing}
				onChange={([v]) => handleCategoryChange(v as ExerciseCategoryEntity)}
				exercises={[
					{ name: "Respiração", value: ExerciseCategoryEntity.Breathing },
					{
						name: "Trava-línguas",
						value: ExerciseCategoryEntity.TongueTwister,
					},
					{ name: "Poemas", value: ExerciseCategoryEntity.Poem },
				]}
			/>
			{isLoading && <LoadingIndicator />}
			{error && <TextError>{(error as Error).message}</TextError>}
			{!error && exercises && (
				<ExerciseList exercises={exercises} category={category} />
			)}
		</>
	);
};
