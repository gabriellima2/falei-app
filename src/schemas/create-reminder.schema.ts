import { z } from "zod";

export const createReminderSchema = z.object({
	days: z.array(z.string()),
	time: z.date(),
});

export type CreateReminderFields = z.infer<typeof createReminderSchema>;
