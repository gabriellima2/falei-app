import { z } from "zod";

export const createTongueTwisterSchema = z.object({
	content: z
		.string({
			invalid_type_error: "Por favor, insira um valor válido para Trava-língua",
			required_error: "O campo Trava-língua é obrigatório",
		})
		.min(1, { message: "O campo Trava-língua é obrigatório" })
		.max(255, {
			message: "O campo Author deve conter no máximo 50 caracteres",
		}),
	author: z
		.string({
			invalid_type_error: "Por favor, insira um valor válido para Autor",
		})
		.optional()
		.refine((value) => !value || value.length <= 50, {
			message: "O campo Autor deve conter no máximo 50 caracteres",
		}),
});

export type CreateTongueTwisterFields = z.infer<
	typeof createTongueTwisterSchema
>;
