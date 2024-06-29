import { MutableRefObject } from "react";
import type { BottomSheetEl } from "@/@types/bottom-sheet-el";

export interface DefineReminderBottomSheetContextProperties {
	ref: MutableRefObject<BottomSheetEl>;
	handleExpand: () => void;
	handleToggle: () => void;
	handleClose: () => void;
}
