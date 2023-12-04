import * as z from "zod";
import { AuthInputDTO } from "@/dtos/auth.dto";

export const userAuthSchema: z.ZodType<AuthInputDTO> = z.object({
	email: z
		.string()
		.min(1, { message: "O campo email é obrigatório" })
		.email("Formato de email inválido"),
	password: z
		.string()
		.min(8, { message: "Digite uma senha com 8 ou mais caracteres" }),
});
