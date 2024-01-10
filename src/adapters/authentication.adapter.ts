import type {
	AuthInputDTO,
	AuthOutputDTO,
	ResetPasswordInputDTO,
	ResetPasswordOutputDTO,
} from "@/dtos/auth.dto";

export interface AuthenticationAdapter {
	signIn(params: AuthInputDTO): AuthOutputDTO;
	signUp(params: AuthInputDTO): AuthOutputDTO;
	anonymous(): AuthOutputDTO;
	resetPassword(params: ResetPasswordInputDTO): ResetPasswordOutputDTO;
}
