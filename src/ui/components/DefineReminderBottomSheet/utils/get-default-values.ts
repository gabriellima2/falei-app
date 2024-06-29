import type { CreateReminderFields } from "@/schemas";

export function getDefaultValues(): CreateReminderFields {
	return {
		days: [],
		time: new Date(),
	};
}
