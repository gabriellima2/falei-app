import { Clock } from "lucide-react-native";

import { BaseExercise } from "../BaseExercise";
import { AdditionalExerciseInfo } from "@/ui/atoms";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type IncompleteExerciseProps = BreathingExerciseEntity & {
	testID?: string;
};

export const IncompleteExercise = (props: IncompleteExerciseProps) => {
	const { id, title, rounds, ...rest } = props;
	return (
		<BaseExercise
			{...rest}
			id={id}
			title={title}
			icon={(props) => <Clock {...props} />}
			href={{ pathname: "/", params: { id } }}
			accessibilityLabel={title}
			accessibilityHint={`Começará o exercício ${title}`}
		>
			<AdditionalExerciseInfo>
				{rounds.rounds_completed} / {rounds.rounds_total} Rounds
			</AdditionalExerciseInfo>
			<AdditionalExerciseInfo>
				{rounds.duration_per_round_in_min} Min.
			</AdditionalExerciseInfo>
		</BaseExercise>
	);
};
