import { z } from "zod";

export const createPoemSchema = z.object({});

export type CreatePoemFields = z.infer<typeof createPoemSchema>;
