import { useContext } from "react";
import { DefineReminderBottomSheetContext } from "../DefineReminderBottomSheetContext";

export const useDefineReminderBottomSheetContext = () =>
	useContext(DefineReminderBottomSheetContext);
