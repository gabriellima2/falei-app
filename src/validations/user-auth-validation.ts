import * as z from "zod";

import { emailConstraint, passwordConstraint } from "./generic-constraints";

import type { AuthInputDTO } from "@/dtos/auth.dto";

export const userAuthSchema: z.ZodType<AuthInputDTO> = z.object({
	email: emailConstraint,
	password: passwordConstraint,
});
