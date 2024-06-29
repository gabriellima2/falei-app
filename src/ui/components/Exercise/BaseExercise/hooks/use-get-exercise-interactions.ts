import { useDefineReminderBottomSheetContext } from "@/contexts/DefineReminderBottomSheetContext";
import { interactions } from "../constants/interactions";

type UseGetExerciseInteractionsParams = {
	id: string;
	withCustomOptions?: boolean;
};

let lastId = "";

export function useGetExerciseInteractions(
	params: UseGetExerciseInteractionsParams
) {
	const { id, withCustomOptions } = params;
	const { handleExpand, handleClose } = useDefineReminderBottomSheetContext();

	function handleDefineReminder() {
		if (id !== lastId) {
			handleClose();
		}
		lastId = id;
		handleExpand();
	}

	function handleEditReminder() {
		console.log("Editing");
	}

	function handleRemoveReminder() {
		console.log("Removing");
	}

	function getInteractions() {
		if (withCustomOptions) {
			return [
				{ ...interactions.edit, onPress: handleEditReminder },
				{ ...interactions.remove, onPress: handleRemoveReminder },
				{ ...interactions.create, onPress: handleDefineReminder },
			];
		}
		return [{ ...interactions.create, onPress: handleDefineReminder }];
	}

	return getInteractions();
}
