import { onAuthStateChanged } from 'firebase/auth'
import { create } from 'zustand'

import { makeFirebaseAuthenticationAdapter } from '@/firebase/adapters/firebase-authentication.adapter'
import { auth } from '@/config/firebase'

import type {
	SignInFields,
	SignUpFields,
	ResetPasswordFields,
} from '@/schemas/authentication.schema'
import type { AuthenticationStoreState } from './@types/authentication-store-state'

const authenticationAdapter = makeFirebaseAuthenticationAdapter()

export const useAuthenticationStore = create<AuthenticationStoreState>(
	(set) => ({
		user: null,
		authHasBeenChecked: false,
		signOut: async () => {
			await authenticationAdapter.signOut()
			set((state) => ({ ...state, user: null, authHasBeenChecked: true }))
		},
		signIn: async (credentials: SignInFields) => {
			const user = await authenticationAdapter.signIn(credentials)
			set((state) => ({ ...state, user, authHasBeenChecked: true }))
		},
		signUp: async (credentials: SignUpFields) => {
			await authenticationAdapter.signUp(credentials)
			set((state) => ({ ...state, authHasBeenChecked: true }))
		},
		resetPassword: async (params: ResetPasswordFields) => {
			await authenticationAdapter.resetPassword(params)
		},
		emailVerification: async () => {
			await authenticationAdapter.emailVerification()
		},
		refreshUser: async () => {
			const user = auth.currentUser
			await user?.reload()
			const refreshedUser = user && {
				id: user.uid,
				email: user.email || '',
				emailVerified: user.emailVerified,
			}
			set((state) => ({
				...state,
				user: refreshedUser ?? null,
				authHasBeenChecked: true,
			}))
		},
		checkAuthState: () =>
			onAuthStateChanged(auth, (credentials) => {
				const user = credentials && {
					id: credentials.uid,
					email: credentials.email || '',
					emailVerified: credentials.emailVerified,
				}
				set((state) => ({
					...state,
					user: user ?? null,
					authHasBeenChecked: true,
				}))
			}),
	}),
)
