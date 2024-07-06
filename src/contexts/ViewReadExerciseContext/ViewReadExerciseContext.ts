import { createContext } from "react";
import { ViewReadExerciseContextProperties } from "./@types/view-read-exercise-context-properties";

export const ViewReadExerciseContext = createContext(
	{} as ViewReadExerciseContextProperties
);
