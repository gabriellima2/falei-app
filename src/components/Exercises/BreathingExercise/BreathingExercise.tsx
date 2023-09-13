import { Shell } from "lucide-react-native";

import { AdditionalExerciseInfo } from "../AdditionalExerciseInfo";
import { BaseExercise } from "../BaseExercise";

import type { BreathingExerciseEntity } from "@/entities";

export const PATHNAME_START_EXERCISE = "/";

export type BreathingExerciseProps = BreathingExerciseEntity;

export const BreathingExercise = (props: BreathingExerciseProps) => {
	const { id, title, duration_in_minutes, repetitions } = props;
	return (
		<BaseExercise
			title={title}
			icon={(props) => <Shell {...props} />}
			href={{ pathname: PATHNAME_START_EXERCISE, params: { id } }}
			accessibilityLabel={title}
			accessibilityHint={`Começará o exercício ${title}`}
		>
			<AdditionalExerciseInfo>{repetitions} Rounds</AdditionalExerciseInfo>
			<AdditionalExerciseInfo>
				{duration_in_minutes} Min.
			</AdditionalExerciseInfo>
		</BaseExercise>
	);
};
