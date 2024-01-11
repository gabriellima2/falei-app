import { onAuthStateChanged, signOut } from "firebase/auth";
import { create } from "zustand";

import { firebaseAuth } from "@/lib/firebase-auth";
import type { AuthStoreState } from "./@types/auth-store-state";
import { makeAuthenticationAdapter } from "@/factories/adapters/make-authentication-adapter";
import { AuthInputDTO, ResetPasswordInputDTO } from "@/dtos/auth.dto";

const authAdapter = makeAuthenticationAdapter();

export const useAuthStore = create<AuthStoreState>((set) => ({
	user: null,
	isNewUser: false,
	authHasBeenChecked: false,
	signOut: async () => {
		await signOut(firebaseAuth);
		set((state) => ({ ...state, user: null, authHasBeenChecked: false }));
	},
	signIn: async (credentials: AuthInputDTO) => {
		await authAdapter.signIn(credentials);
	},
	signUp: async (credentials: AuthInputDTO) => {
		await authAdapter.signUp(credentials);
		set((state) => ({ ...state, isNewUser: true }));
	},
	anonymous: async () => {
		await authAdapter.anonymous();
	},
	resetPassword: async (params: ResetPasswordInputDTO) => {
		await authAdapter.resetPassword(params);
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
}));
