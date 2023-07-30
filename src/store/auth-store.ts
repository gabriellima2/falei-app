import { Unsubscribe, User, onAuthStateChanged, signOut } from "firebase/auth";
import { create } from "zustand";

import { firebaseAuth } from "@/helpers/firebase-auth";

type UseAuthStore = {
	user: User | null;
	authHasBeenChecked: boolean;
	signOut: () => Promise<void>;
	checkAuthState: () => Unsubscribe;
};

export const useAuthStore = create<UseAuthStore>((set) => ({
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
