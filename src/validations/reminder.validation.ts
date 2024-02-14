import type { BreathingFormFields } from "@/hooks/use-breathing-form";

type BreathingExerciseValidationOptions = {
	hasReminder?: boolean;
};

export function reminderValidation(
	values: Pick<BreathingFormFields, "days" | "time">,
	options: BreathingExerciseValidationOptions
) {
	const { hasReminder } = options;
	if (hasReminder && !values.days.length) return "Selecione os dias";
	if (hasReminder && !values.time) return "Selecione o horário";
}
