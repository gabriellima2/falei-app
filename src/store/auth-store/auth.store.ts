import { onAuthStateChanged, signOut } from "firebase/auth";
import { create } from "zustand";

import { firebaseAuth } from "@/helpers/firebase-auth";
import type { AuthStoreState } from "./@types/auth-store-state";

export const useAuthStore = create<AuthStoreState>((set) => ({
	user: null,
	authHasBeenChecked: false,
	signOut: async () => {
		await signOut(firebaseAuth);
		set((state) => ({ ...state, user: null, authHasBeenChecked: false }));
	},
	checkAuthState: () =>
		onAuthStateChanged(firebaseAuth, (user) => {
			set((state) => ({ ...state, user, authHasBeenChecked: true }));
		}),
}));
