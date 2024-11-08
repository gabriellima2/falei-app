import type { Unsubscribe } from 'firebase/firestore'

import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
	UpdatePasswordFields,
} from '@/schemas/authentication.schema'
import type { UserEntity } from '@/entities/user.entity'

type User = Omit<UserEntity, 'password'> | null

export type AuthenticationStoreState = {
	user: User | null
	authHasBeenChecked: boolean
	signOut: () => Promise<void>
	signIn: (credentials: SignInFields) => Promise<void>
	signUp: (credentials: SignUpFields) => Promise<void>
	resetPassword: (params: ResetPasswordFields) => Promise<void>
	emailVerification: () => Promise<void>
	refreshUser: () => Promise<User | null>
	checkAuthState: () => Unsubscribe
	updatePassword(params: UpdatePasswordFields): Promise<void>
}
