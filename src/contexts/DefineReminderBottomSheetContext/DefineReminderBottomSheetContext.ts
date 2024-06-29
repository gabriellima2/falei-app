import { createContext } from "react";
import { DefineReminderBottomSheetContextProperties } from "./@types/reminder-bottom-sheet-context-properties";

export const DefineReminderBottomSheetContext = createContext(
	{} as DefineReminderBottomSheetContextProperties
);
