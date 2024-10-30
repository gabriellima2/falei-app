import type { Unsubscribe } from 'firebase/firestore'

import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
} from '@/schemas/authentication.schema'
import type { UserEntity } from '@/entities/user.entity'

export type AuthenticationStoreState = {
	user: Omit<UserEntity, 'password'> | null
	authHasBeenChecked: boolean
	signOut: () => Promise<void>
	signIn: (credentials: SignInFields) => Promise<void>
	signUp: (credentials: SignUpFields) => Promise<void>
	resetPassword: (params: ResetPasswordFields) => Promise<void>
	emailVerification: () => Promise<void>
	refreshUser: () => Promise<void>
	checkAuthState: () => Unsubscribe
}
