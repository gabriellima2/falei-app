import {
	BreathingExercise,
	FilterByExercise,
	Header,
	ReadExercise,
} from "@/components";
import { BreathingExerciseEntity } from "@/entities/breathing-entities";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ReadExerciseEntity } from "@/entities/read-entities";
import { FlatList } from "react-native";
import { useExercises } from "./hooks/use-exercises";

const exerciseItem = {
	[ExerciseCategoryEntity.Breathing]: (props: BreathingExerciseEntity) => (
		<BreathingExercise {...props} />
	),
	[ExerciseCategoryEntity.TongueTwister]: (props: ReadExerciseEntity) => (
		<ReadExercise id={props.id} content={props.content} />
	),
	[ExerciseCategoryEntity.Poem]: (props: ReadExerciseEntity) => (
		<ReadExercise id={props.id} content={props.content} />
	),
};

export const Exercises = () => {
	const { exercises, category, error, isLoading, handleCategoryChange } =
		useExercises();
	const Exercise = exerciseItem[category];
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
			<FlatList
				data={exercises}
				renderItem={({ item }) => <Exercise {...item} />}
			/>
		</>
	);
};
