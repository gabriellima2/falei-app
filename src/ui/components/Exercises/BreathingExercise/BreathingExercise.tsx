import { Shell } from "lucide-react-native";

import { AdditionalExerciseInfo } from "../AdditionalExerciseInfo";
import { BaseExercise } from "../BaseExercise";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export const PATHNAME_START_EXERCISE = "/";

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
			href={{ pathname: PATHNAME_START_EXERCISE, params: { id } }}
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
