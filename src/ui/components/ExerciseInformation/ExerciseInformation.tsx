import {
	AdditionalExerciseInfo,
	type AdditionalExerciseInfoProps,
} from "@/ui/atoms";
import {
	useExerciseInformationState,
	type UseExerciseInformationStateParams,
} from "./hooks/use-exercise-information-state";

type ExerciseInformationProps = UseExerciseInformationStateParams &
	AdditionalExerciseInfoProps;

export const ExerciseInformation = (props: ExerciseInformationProps) => {
	const { hasDarkColors, ...rest } = props;
	const { rounds, duration } = useExerciseInformationState(rest);
	return (
		<>
			<AdditionalExerciseInfo hasDarkColors={hasDarkColors}>
				{rounds} Rounds
			</AdditionalExerciseInfo>
			<AdditionalExerciseInfo hasDarkColors={hasDarkColors}>
				{duration}
			</AdditionalExerciseInfo>
		</>
	);
};
