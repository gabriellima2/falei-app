import type {
	AuthInputDTO,
	AuthOutputDTO,
	ResetPasswordInputDTO,
	ResetPasswordOutputDTO,
} from "@/dtos/auth.dto";

export interface AuthenticationAdapter {
	signIn(params: AuthInputDTO): AuthOutputDTO;
	signUp(params: AuthInputDTO): AuthOutputDTO;
	signOut(): Promise<void>;
	anonymous(): AuthOutputDTO;
	resetPassword(params: ResetPasswordInputDTO): ResetPasswordOutputDTO;
	emailVerification(): Promise<void>;
}
