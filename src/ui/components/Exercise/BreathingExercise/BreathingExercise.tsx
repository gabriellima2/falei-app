import { Shell } from "lucide-react-native";

import { ExerciseInformation } from "../../ExerciseInformation";
import { BaseExercise } from "../BaseExercise";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type BreathingExerciseProps = BreathingExerciseEntity & {
	testID?: string;
};

export const BreathingExercise = (props: BreathingExerciseProps) => {
	const { id, title, rounds, steps, ...rest } = props;
	const duration = steps
		? Object.values(steps).reduce((acc, value) => (acc += value), 0)
		: 0;
	return (
		<BaseExercise
			{...rest}
			id={id}
			withCustomOptions={!!rest.userID}
			title={title}
			icon={(props) => <Shell {...props} />}
			href={{ pathname: `/do-breathing-exercise/${props.id}` }}
			accessibilityLabel={title}
			accessibilityHint={`Começará o exercício ${title}`}
		>
			<ExerciseInformation
				rounds={{
					total: rounds.total,
					completed: rounds.completed,
					duration,
				}}
			/>
		</BaseExercise>
	);
};
