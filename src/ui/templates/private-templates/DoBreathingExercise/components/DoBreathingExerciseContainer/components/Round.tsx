import { Typography } from "@/ui/atoms";
import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";

export function Round() {
	const { breathing, currentRound } = useDoBreathingExerciseContext();
	return (
		<Typography.Small>
			{currentRound}/{breathing!.rounds.total}
		</Typography.Small>
	);
}
