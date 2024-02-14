import { z } from "zod";

function isValidNumberRange(value: string) {
	const formattedValue = parseInt(value);
	return !isNaN(formattedValue) && formattedValue > 0 && formattedValue <= 10;
}

export const createBreathingExerciseSchema = z.object({
	title: z.string().min(1).max(50),
	rounds: z.string().refine(isValidNumberRange, {
		message: "Insira um valor numérico inteiro entre 1 e 10",
	}),
	timer: z.object({
		inhale: z.string().refine(isValidNumberRange, {
			message: "Insira um valor numérico inteiro entre 1 e 10",
		}),
		hold: z.string().refine(isValidNumberRange, {
			message: "Insira um valor numérico inteiro entre 1 e 10",
		}),
		exhale: z.string().refine(isValidNumberRange, {
			message: "Insira um valor numérico inteiro entre 1 e 10",
		}),
	}),
	days: z.array(z.string()).optional(),
	time: z.date().optional(),
});
