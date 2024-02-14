import { z } from "zod";
import type { BreathingFormFields } from "@/hooks/use-breathing-form";

type BreathingExerciseValidationOptions = {
	schema: z.ZodType<BreathingFormFields>;
	hasReminder?: boolean;
};

export function breathingExerciseValidation(
	values: BreathingFormFields,
	options: BreathingExerciseValidationOptions
) {
	const { schema, hasReminder } = options;
	const result = schema.safeParse(values);
	if (!result.success) return result.error.errors[0].message;
	if (hasReminder && !values.days.length) return "Selecione os dias";
	if (hasReminder && !values.timer) return "Selecione o horário";
}
