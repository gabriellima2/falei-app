import { z } from "zod";

export const passwordConstraint = z
	.string()
	.min(8, { message: "Digite uma senha com 8 ou mais caracteres" });
