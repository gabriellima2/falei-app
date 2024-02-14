import { z } from "zod";

export const emailConstraint = z
	.string()
	.min(1, { message: "O campo email é obrigatório" })
	.email("Formato de email inválido");
