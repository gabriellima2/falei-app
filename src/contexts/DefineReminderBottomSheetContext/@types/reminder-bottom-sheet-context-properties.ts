import { MutableRefObject } from "react";

import type { BottomSheetEl } from "@/@types/bottom-sheet-el";

export interface DefineReminderBottomSheetContextProperties {
	ref: MutableRefObject<BottomSheetEl>;
	selectedExercise: SelectedExercise | null;
	handleExpand: (exercise: SelectedExercise) => void;
	handleToggle: (exercise: SelectedExercise) => void;
	handleClose: () => void;
}
