import { useRouter } from "expo-router";

import { useToastContext } from "@/contexts/ToastContext";

import { makeBreathingService } from "@/factories/services/make-breathing-service";

import { createReminderMapper } from "../mappers/create-reminder.mapper";
import { reminderValidation } from "@/validations";
import { UNEXPECTED_ERROR } from "@/errors";

import type { CreateReminderFields } from "@/schemas";

type UseCreateReminderParams = {
	onSuccess?: () => void;
};

const service = makeBreathingService();

export function useCreateReminder(params: UseCreateReminderParams) {
	const { onSuccess } = params;
	const { notify } = useToastContext();

	const handleCreate = async (userId: string, values: CreateReminderFields) => {
		const result = reminderValidation(values, { hasReminder: true });
		if (result) return notify(result, { type: "alert" });
		try {
			console.log(createReminderMapper(values));
			// await service.create(userId, createReminderMapper(values));
			notify("Lembrete definido com sucesso", { type: "success" });
			onSuccess && onSuccess();
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return { handleCreate };
}
