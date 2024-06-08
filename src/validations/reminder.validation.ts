import type { CreateBreathingExerciseFields } from "@/schemas";

type BreathingExerciseValidationOptions = {
	hasReminder?: boolean;
};

export function reminderValidation(
	values: Pick<CreateBreathingExerciseFields, "days" | "time">,
	options: BreathingExerciseValidationOptions
) {
	const { hasReminder } = options;
	if (hasReminder && !values.days?.length) return "Selecione os dias";
	if (hasReminder && !values.time) return "Selecione o horário";
}
