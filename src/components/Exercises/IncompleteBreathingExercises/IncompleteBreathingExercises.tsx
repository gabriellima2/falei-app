import {
	ExerciseInProgress,
	type ExerciseInProgressProps,
} from "../ExerciseInProgress";
import { HorizontalList, Typography } from "@/components/commons";

import type { BreathingExerciseEntity } from "@/entities";

export type IncompleteBreathingExercisesProps = Pick<
	ExerciseInProgressProps,
	"href"
> & {
	exercises: BreathingExerciseEntity[];
};

export const IncompleteBreathingExercises = (
	props: IncompleteBreathingExercisesProps
) => {
	const { exercises, href } = props;
	return (
		<HorizontalList
			data={exercises}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => (
				<ExerciseInProgress
					id={item.id}
					title={item.title}
					rounds={{
						completed: item.rounds.rounds_completed,
						total: item.rounds.rounds_total,
					}}
					href={href}
				/>
			)}
			ListEmptyComponent={() => (
				<Typography.Title accessibilityLabel="Não há exercícios em progresso">
					Nenhum exercício em progresso
				</Typography.Title>
			)}
		/>
	);
};
