import { useDefineReminderBottomSheetContext } from "@/contexts/DefineReminderBottomSheetContext/hooks/use-reminder-bottom-sheet-context";
import { useToastContext } from "@/contexts/ToastContext";

import { makeReminderService } from "@/factories/services/make-reminder-service";

import { createReminderMapper } from "../mappers/create-reminder.mapper";
import { reminderValidation } from "@/validations";

import { DEFINE_REMINDER_WITHOUT_EXERCISE_ERROR } from "@/errors/define-reminder-without-exercise-error";
import { UNEXPECTED_ERROR } from "@/errors";

import type { CreateReminderFields } from "@/schemas";

const service = makeReminderService();

export function useCreateReminder() {
	const { notify } = useToastContext();
	const { selectedExercise, handleClose } =
		useDefineReminderBottomSheetContext();

	const handleCreate = async (userId: string, values: CreateReminderFields) => {
		try {
			const result = reminderValidation(values, { hasReminder: true });
			if (result) throw new Error(result);
			if (!selectedExercise) {
				throw new Error(DEFINE_REMINDER_WITHOUT_EXERCISE_ERROR);
			}
			await service.create(
				userId,
				createReminderMapper(selectedExercise, values)
			);
			notify("Lembrete definido com sucesso", { type: "success" });
			handleClose();
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return { handleCreate };
}
