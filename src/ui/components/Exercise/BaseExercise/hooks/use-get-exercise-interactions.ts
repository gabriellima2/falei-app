import { interactions } from "../constants/interactions";

type UseGetExerciseInteractionsParams = {
	withCustomOptions?: boolean;
};

export function useGetExerciseInteractions(
	params: UseGetExerciseInteractionsParams
) {
	const { withCustomOptions } = params;

	function handleDefineReminder() {
		console.log("Defining");
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
