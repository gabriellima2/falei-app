import { Clock } from "lucide-react-native";

import { ExerciseInformation } from "../../ExerciseInformation";
import { BaseExercise } from "../BaseExercise";

import { START_EXERCISE_PATHNAME } from "@/constants/start-exercise-pathname";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type IncompleteExerciseProps = BreathingExerciseEntity & {
	testID?: string;
};

export const IncompleteExercise = (props: IncompleteExerciseProps) => {
	const { id, title, rounds, category, ...rest } = props;

	return (
		<BaseExercise
			{...rest}
			id={id}
			title={title}
			icon={(props) => <Clock {...props} />}
			href={{ pathname: START_EXERCISE_PATHNAME, params: { id, category } }}
			accessibilityLabel={title}
			accessibilityHint={`Começará o exercício ${title}`}
		>
			<ExerciseInformation
				rounds={{
					total: rounds.rounds_total,
					completed: rounds.rounds_completed,
					duration: rounds.duration_per_round_in_sec,
				}}
			/>
		</BaseExercise>
	);
};
