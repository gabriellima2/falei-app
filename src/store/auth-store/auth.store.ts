import { onAuthStateChanged, signOut } from "firebase/auth";
import { create } from "zustand";

import { firebaseAuth } from "@/lib/firebase-auth";
import type { AuthStoreState } from "./@types/auth-store-state";

export const useAuthStore = create<AuthStoreState>((set) => ({
	user: null,
	authHasBeenChecked: false,
	signOut: async () => {
		await signOut(firebaseAuth);
		set((state) => ({ ...state, user: null, authHasBeenChecked: false }));
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
