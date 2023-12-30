import { Unsubscribe } from "firebase/firestore";
import { UserEntity } from "@/entities/user.entity";

export type AuthStoreState = {
	user: Omit<UserEntity, "password"> | null;
	authHasBeenChecked: boolean;
	signOut: () => Promise<void>;
	checkAuthState: () => Unsubscribe;
};
