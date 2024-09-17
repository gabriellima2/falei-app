import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
} from '@/schemas/authentication.schema'

export interface AuthenticationAdapter {
	signIn(params: SignInFields): Promise<void>
	signUp(params: SignUpFields): Promise<void>
	signOut(): Promise<void>
	resetPassword(params: ResetPasswordFields): Promise<void>
	emailVerification(): Promise<void>
}
