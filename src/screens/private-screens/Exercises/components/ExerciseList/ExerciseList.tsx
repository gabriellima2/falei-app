import { FlatList } from "react-native";

import { BreathingExercise, ReadExercise } from "@/components";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";
import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { ExerciseEntity } from "@/entities/exercise.entity";

type ExerciseListProps = {
	exercises: ExerciseEntity[];
	category: ExerciseCategoryEntity;
};

const exerciseItem = {
	[ExerciseCategoryEntity.Breathing]: (props: ExerciseEntity) => (
		<BreathingExercise {...(props as BreathingExerciseEntity)} />
	),
	[ExerciseCategoryEntity.TongueTwister]: (props: ExerciseEntity) => (
		<ReadExercise {...(props as ReadExerciseEntity)} />
	),
	[ExerciseCategoryEntity.Poem]: (props: ExerciseEntity) => (
		<ReadExercise {...(props as ReadExerciseEntity)} />
	),
};

export const ExerciseList = (props: ExerciseListProps) => {
	const { exercises, category } = props;
	const ExerciseItem = exerciseItem[category];
	return (
		<FlatList
			numColumns={2}
			data={exercises}
			renderItem={({ item }) => <ExerciseItem {...item} />}
			keyExtractor={({ id }) => id.toString()}
		/>
	);
};
