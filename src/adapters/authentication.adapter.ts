import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	signOut,
	type UserCredential,
} from 'firebase/auth'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'
import { auth } from '@/config/firebase'

import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
} from '@/schemas/authentication.schema'

export interface AuthenticationAdapter {
	signIn(params: SignInFields): Promise<UserCredential>
	signUp(params: SignUpFields): Promise<UserCredential>
	signOut(): Promise<void>
	resetPassword(params: ResetPasswordFields): Promise<void>
	emailVerification(): Promise<void>
}

class AuthenticationAdapterImpl implements AuthenticationAdapter {
	async signIn(credentials: SignInFields): Promise<UserCredential> {
		const { email, password } = credentials
		return await signInWithEmailAndPassword(auth, email, password)
	}
	async signUp(credentials: SignUpFields): Promise<UserCredential> {
		const { email, password } = credentials
		return await createUserWithEmailAndPassword(auth, email, password)
	}
	async resetPassword(params: ResetPasswordFields): Promise<void> {
		const { email } = params
		return await sendPasswordResetEmail(auth, email)
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

export const makeAuthenticationAdapter = () => new AuthenticationAdapterImpl()
