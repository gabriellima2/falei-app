import { firebaseAuth } from "@/helpers/firebase-auth";
import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

type UseAuthStore = {
	user: User | null;
	authHasBeenChecked: boolean;
	checkAuthState: () => Unsubscribe;
};

export const useAuthStore = create<UseAuthStore>((set) => ({
	user: null,
	authHasBeenChecked: false,
	checkAuthState: () =>
		onAuthStateChanged(firebaseAuth, (user) => {
			set((state) => ({ ...state, user, authHasBeenChecked: true }));
		}),
}));
