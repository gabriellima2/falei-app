import { useContext } from "react";
import { DoBreathingExerciseContext } from "../DoBreathingExerciseContext";

export function useDoBreathingExerciseContext() {
	return useContext(DoBreathingExerciseContext);
}
