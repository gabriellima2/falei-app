import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	signOut,
	updatePassword as updatePasswordFirebase,
	deleteUser,
} from 'firebase/auth'

import { UnauthenticatedUserException } from '@/exceptions/unauthenticated-user.exception'
import { auth } from '@/config/firebase'

import type { AuthenticationAdapter } from '@/adapters/authentication.adapter'
import type { UserDTO } from '@/dtos/authentication.dto'
import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
	UpdatePasswordFields,
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
		if (!user) throw new UnauthenticatedUserException()
		await sendEmailVerification(user)
	}
	async updatePassword(params: UpdatePasswordFields): Promise<void> {
		const { password } = params
		const user = auth.currentUser
		if (!user) throw new UnauthenticatedUserException()
		await updatePasswordFirebase(user, password)
	}
	async deleteAccount(): Promise<void> {
		const user = auth.currentUser
		if (!user) throw new UnauthenticatedUserException()
		await deleteUser(user)
	}
}

export const makeFirebaseAuthenticationAdapter = () =>
	new FirebaseAuthenticationAdapter()
