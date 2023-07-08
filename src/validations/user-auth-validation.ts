import * as z from "zod";
import { UserAuthRequestDTO } from "@/dtos";

export const userAuthSchema: z.ZodType<UserAuthRequestDTO> = z.object({
	email: z
		.string()
		.min(1, { message: "O campo email é obrigatório" })
		.email("Formato de email inválido"),
	password: z
		.string()
		.nonempty({ message: "O campo senha é obrigatório" })
		.min(8, { message: "Digite uma senha com 8 ou mais caracteres" }),
});
