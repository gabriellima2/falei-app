import { DoBreathingExercise } from "./components/DoBreathingExercise";
import { LoadingIndicator } from "@/ui/atoms";

import { useDoBreathingExerciseContext } from "../../contexts/DoBreathingExerciseContext/hooks/use-do-breathing-exercise-context";

export function DoBreathingExerciseContainer() {
	const { breathing, isLoading } = useDoBreathingExerciseContext();
	return (
		<>
			{isLoading && <LoadingIndicator />}
			{breathing && <DoBreathingExercise />}
		</>
	);
}
