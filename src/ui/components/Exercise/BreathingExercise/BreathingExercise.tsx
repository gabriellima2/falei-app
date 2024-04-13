import { Shell } from "lucide-react-native";

import { ExerciseInformation } from "../../ExerciseInformation";
import { BaseExercise } from "../BaseExercise";

import { START_EXERCISE_PATHNAME } from "@/constants/start-exercise-pathname";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
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
			title={title}
			icon={(props) => <Shell {...props} />}
			href={{
				pathname: START_EXERCISE_PATHNAME,
				params: { id, category: ExerciseCategoryEntity.Breathing },
			}}
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
