import type { CreateReminderInputDTO } from "@/dtos/reminder.dto";
import type { CreateReminderFields } from "@/schemas";

export function createReminderMapper(
	fields: CreateReminderFields
): CreateReminderInputDTO {
	return {
		time: fields.time,
		days: fields.days,
	};
}
