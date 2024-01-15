import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

import { makeAuthenticationAdapter } from "@/factories/adapters/make-authentication-adapter";
import { firebaseAuth } from "@/lib/firebase-auth";

import type { AuthInputDTO, ResetPasswordInputDTO } from "@/dtos/auth.dto";
import type { AuthenticationStoreState } from "./@types/authentication-store-state";

const authenticationAdapter = makeAuthenticationAdapter();

export const useAuthenticationStore = create<AuthenticationStoreState>(
	(set) => ({
		user: null,
		isNewUser: false,
		authHasBeenChecked: false,
		signOut: async () => {
			await authenticationAdapter.signOut();
			set((state) => ({ ...state, user: null, authHasBeenChecked: false }));
		},
		signIn: async (credentials: AuthInputDTO) => {
			await authenticationAdapter.signIn(credentials);
		},
		signUp: async (credentials: AuthInputDTO) => {
			await authenticationAdapter.signUp(credentials);
			set((state) => ({ ...state, isNewUser: true }));
		},
		anonymous: async () => {
			await authenticationAdapter.anonymous();
		},
		resetPassword: async (params: ResetPasswordInputDTO) => {
			await authenticationAdapter.resetPassword(params);
		},
		emailVerification: async () => {
			await authenticationAdapter.emailVerification();
		},
		checkAuthState: () =>
			onAuthStateChanged(firebaseAuth, (credentials) => {
				const user = credentials && {
					id: credentials.uid,
					email: credentials.email,
					emailVerified: credentials.emailVerified,
					isAnonymous: credentials.isAnonymous,
				};
				set((state) => ({
					...state,
					user: user ?? null,
					authHasBeenChecked: true,
				}));
			}),
	})
);
