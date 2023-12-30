import type { AuthInputDTO, AuthOutputDTO } from "@/dtos/auth.dto";

export interface AuthenticationAdapter {
	signIn(params: AuthInputDTO): AuthOutputDTO;
	signUp(params: AuthInputDTO): AuthOutputDTO;
	anonymous(): AuthOutputDTO;
}
