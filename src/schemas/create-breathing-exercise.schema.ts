import { z } from "zod";
import type { BreathingFormFields } from "@/hooks/use-breathing-form";

function isValidNumberRange(value: string) {
	const formattedValue = parseInt(value);
	return !isNaN(formattedValue) && formattedValue > 0 && formattedValue <= 10;
}

export const createBreathingExerciseSchema = z.object({
	title: z
		.string()
		.min(1, { message: "O campo de Título é obrigatório" })
		.max(50, {
			message: "O campo de Título deve conter no máximo 50 caracteres",
		}),
	rounds: z.string().refine(isValidNumberRange, {
		message:
			"O campo de Repetições deve conter um valor numérico inteiro entre 1 e 10",
	}),
	steps: z.object({
		inhale: z.string().refine(isValidNumberRange, {
			message:
				"O campo de Inspirar deve conter um valor numérico inteiro entre 1 e 10",
		}),
		hold: z.string().refine(isValidNumberRange, {
			message:
				"O campo de Segurar deve conter um valor numérico inteiro entre 1 e 10",
		}),
		exhale: z.string().refine(isValidNumberRange, {
			message:
				"O campo de Expirar deve conter um valor numérico inteiro entre 1 e 10",
		}),
	}),
	days: z.array(z.string()).optional(),
	time: z.date().optional(),
}) as unknown as z.ZodType<BreathingFormFields>;
