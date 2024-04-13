import { Exercise, type ExerciseProps } from "./components/Exercise";
import { EmptyDataMessage, HorizontalList } from "@/ui/atoms";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

type Exercise = Pick<
	BreathingExerciseEntity,
	"id" | "rounds" | "title" | "category"
>;
type Params = Exercise;

export type IncompleteExercisesProps<T extends Params> = Pick<
	ExerciseProps,
	"href"
> & {
	exercises: T[];
};

export const IncompleteExercises = <T extends Params>(
	props: IncompleteExercisesProps<T>
) => {
	const { exercises, href } = props;
	const hasMoreThanOneItem = !!exercises && exercises.length > 1;
	return (
		<HorizontalList
			data={exercises}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => (
				<Exercise
					id={item.id}
					title={item.title}
					rounds={{
						completed: item.rounds.completed,
						total: item.rounds.total,
					}}
					href={href}
					withPreviewForNextItem={hasMoreThanOneItem}
				/>
			)}
			ListEmptyComponent={() => (
				<EmptyDataMessage message="Não há exercícios em progresso" />
			)}
		/>
	);
};
