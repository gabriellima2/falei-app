import { z } from "zod";

export const createBreathingExerciseSchema = z.object({
	title: z.string().min(1).max(50),
	rounds: z.number().int().min(1).max(10),
	timer: z.object({
		inhale: z.number().int().min(1).max(10),
		hold: z.number().int().min(1).max(10),
		exhale: z.number().int().min(1).max(10),
	}),
	days: z.array(z.string()).optional(),
	time: z.date().optional(),
});
