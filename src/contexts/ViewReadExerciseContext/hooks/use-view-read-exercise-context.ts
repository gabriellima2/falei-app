import { useContext } from "react";
import { ViewReadExerciseContext } from "../ViewReadExerciseContext";

export const useViewReadExerciseContext = () =>
	useContext(ViewReadExerciseContext);
