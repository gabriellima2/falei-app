import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	signOut,
} from 'firebase/auth'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'
import { auth } from '@/config/firebase'

import type { AuthenticationAdapter } from '@/adapters/authentication.adapter'
import type { UserDTO } from '@/dtos/authentication.dto'
import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
} from '@/schemas/authentication.schema'

class FirebaseAuthenticationAdapter implements AuthenticationAdapter {
	async signIn(credentials: SignInFields): Promise<UserDTO> {
		const { email, password } = credentials
		const { user } = await signInWithEmailAndPassword(auth, email, password)
		return {
			id: user.uid,
			email: user.email || '',
			emailVerified: user.emailVerified,
		}
	}
	async signUp(credentials: SignUpFields): Promise<void> {
		const { email, password } = credentials
		await createUserWithEmailAndPassword(auth, email, password)
	}
	async resetPassword(params: ResetPasswordFields): Promise<void> {
		const { email } = params
		await sendPasswordResetEmail(auth, email)
	}
	async signOut(): Promise<void> {
		await signOut(auth)
	}
	async emailVerification(): Promise<void> {
		const user = auth.currentUser
		if (!user) throw new Error(DEFAULT_ERROR_MESSAGES.NO_USER_AUTHENTICATED)
		await sendEmailVerification(user)
	}
}

export const makeFirebaseAuthenticationAdapter = () =>
	new FirebaseAuthenticationAdapter()
