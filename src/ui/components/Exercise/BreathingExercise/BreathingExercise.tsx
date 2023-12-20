import { Shell } from "lucide-react-native";

import { BaseExercise } from "../BaseExercise";
import { AdditionalExerciseInfo } from "@/ui/atoms";

import { START_EXERCISE_PATHNAME } from "@/constants/start-exercise-pathname";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type BreathingExerciseProps = BreathingExerciseEntity & {
	testID?: string;
};

export const BreathingExercise = (props: BreathingExerciseProps) => {
	const { id, title, rounds, ...rest } = props;
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
			<AdditionalExerciseInfo>
				{rounds.rounds_total} Rounds
			</AdditionalExerciseInfo>
			<AdditionalExerciseInfo>
				{rounds.duration_per_round_in_min} Min.
			</AdditionalExerciseInfo>
		</BaseExercise>
	);
};
