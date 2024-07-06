import type { MutableRefObject } from "react";
import type { ReadExerciseCategory } from "@/@types/exercise-type-categories";
import type { BottomSheetEl } from "@/@types/bottom-sheet-el";

export interface ViewReadExerciseContextProperties {
	ref: MutableRefObject<BottomSheetEl>;

	readExerciseCategory: ReadExerciseCategory | null;
	exerciseId: string | null;

	handleExpand: (exerciseId: string, category: ReadExerciseCategory) => void;
	handleToggle: (exerciseId: string, category: ReadExerciseCategory) => void;
	handleClose: () => void;
}
