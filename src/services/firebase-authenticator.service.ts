import type { AuthInputDTO, AuthOutputDTO } from "@/dtos/auth.dto";

export interface FirebaseAuthenticatorService {
	signIn(params: AuthInputDTO): AuthOutputDTO;
	signUp(params: AuthInputDTO): AuthOutputDTO;
}
