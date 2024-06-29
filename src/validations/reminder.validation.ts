import type { CreateReminderFields } from "@/schemas";

type ReminderValidationOptions = {
	hasReminder?: boolean;
};

export function reminderValidation(
	values: Pick<CreateReminderFields, "days" | "time">,
	options: ReminderValidationOptions
) {
	const { hasReminder } = options;
	if (hasReminder && !values.days?.length) return "Selecione os dias";
	if (hasReminder && !values.time) return "Selecione o horário";
}
