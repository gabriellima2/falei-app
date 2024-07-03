import { useDefineReminderBottomSheetContext } from "@/contexts/DefineReminderBottomSheetContext";
import { interactions } from "../constants/interactions";
import { makeBreathingService } from "@/factories/services/make-breathing-service";
import { useToastContext } from "@/contexts/ToastContext";
import { queryClient } from "@/lib/query-client";
import { UNEXPECTED_ERROR } from "@/errors";

type UseGetExerciseInteractionsParams = {
	id: string;
	title: string;
	withCustomOptions?: boolean;
};

let lastId = "";

const service = makeBreathingService();

export function useGetExerciseInteractions(
	params: UseGetExerciseInteractionsParams
) {
	const { id, title, withCustomOptions } = params;
	const { handleExpand, handleClose } = useDefineReminderBottomSheetContext();
	const { notify } = useToastContext();

	function handleDefineReminder() {
		if (id !== lastId) {
			handleClose();
		}
		lastId = id;
		handleExpand({ id, title });
	}

	async function handleRemoveReminder() {
		try {
			await service.delete(id);
			notify("Exercício deletado com sucesso", { type: "success" });
			queryClient.invalidateQueries({ queryKey: ["breathing-exercises"] });
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	}

	function getInteractions() {
		if (withCustomOptions) {
			return [
				{ ...interactions.remove, onPress: handleRemoveReminder },
				{ ...interactions.create, onPress: handleDefineReminder },
			];
		}
		return [{ ...interactions.create, onPress: handleDefineReminder }];
	}

	return getInteractions();
}
