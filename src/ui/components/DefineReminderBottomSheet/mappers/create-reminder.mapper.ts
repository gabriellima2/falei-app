import type { CreateReminderInputDTO } from "@/dtos/reminder.dto";
import type { CreateReminderFields } from "@/schemas";

export function createReminderMapper(
	exercise: SelectedExercise,
	fields: CreateReminderFields
): CreateReminderInputDTO {
	return {
		id: exercise.id,
		title: exercise.title,
		time: fields.time,
		days: fields.days,
	};
}
