import { createContext } from "react";
import type { DoBreathingExerciseContextProperties } from "./@types/do-breathing-exercise-context-properties";

export const DoBreathingExerciseContext = createContext(
	{} as DoBreathingExerciseContextProperties
);
