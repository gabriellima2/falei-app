import type { UserDTO } from '@/dtos/authentication.dto'
import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
	UpdatePasswordFields,
} from '@/schemas/authentication.schema'

export interface AuthenticationAdapter {
	signIn(params: SignInFields): Promise<UserDTO>
	signUp(params: SignUpFields): Promise<void>
	signOut(): Promise<void>
	resetPassword(params: ResetPasswordFields): Promise<void>
	emailVerification(): Promise<void>
	updatePassword(params: UpdatePasswordFields): Promise<void>
}
