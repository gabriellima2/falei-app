import { User } from "firebase/auth";
import { Unsubscribe } from "firebase/firestore";

export type AuthStoreState = {
	user: User | null;
	authHasBeenChecked: boolean;
	signOut: () => Promise<void>;
	checkAuthState: () => Unsubscribe;
};
