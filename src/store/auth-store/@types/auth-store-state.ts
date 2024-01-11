import { Unsubscribe } from "firebase/firestore";
import { UserEntity } from "@/entities/user.entity";
import {
	AuthInputDTO,
	ResetPasswordInputDTO,
	ResetPasswordOutputDTO,
} from "@/dtos/auth.dto";

export type AuthStoreState = {
	user: Omit<UserEntity, "password"> | null;
	isNewUser: boolean;
	authHasBeenChecked: boolean;
	signOut: () => Promise<void>;
	signIn: (credentials: AuthInputDTO) => Promise<void>;
	signUp: (credentials: AuthInputDTO) => Promise<void>;
	anonymous: () => Promise<void>;
	resetPassword: (params: ResetPasswordInputDTO) => ResetPasswordOutputDTO;
	checkAuthState: () => Unsubscribe;
};
