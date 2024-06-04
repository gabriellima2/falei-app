import { z } from "zod";

export const createPoemSchema = z.object({
	content: z
		.string({
			invalid_type_error: "Por favor, insira um valor válido para Poema",
			required_error: "O campo Poema é obrigatório",
		})
		.min(1, { message: "O campo Poema é obrigatório" })
		.max(255, {
			message: "O campo Author deve conter no máximo 50 caracteres",
		}),
	credits: z.object({
		author: z
			.string({
				invalid_type_error: "Por favor, insira um valor válido para Autor",
			})
			.optional()
			.refine((value) => !value || value.length <= 50, {
				message: "O campo Autor deve conter no máximo 50 caracteres",
			}),
		workName: z
			.string({
				invalid_type_error: "Por favor, insira um valor válido para Título",
			})
			.optional()
			.refine((value) => !value || value.length <= 50, {
				message: "O campo Título deve conter no máximo 50 caracteres",
			}),
	}),
});

export type CreatePoemFields = z.infer<typeof createPoemSchema>;
