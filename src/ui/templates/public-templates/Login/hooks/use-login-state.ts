import { useAuthenticationStore } from "@/store/authentication-store";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { UserEntity } from "@/entities/user.entity";

type UseLoginStateReturn = {
	user: Omit<UserEntity, "password"> | null;
	handleSignIn: (credentials: AuthInputDTO) => Promise<void>;
};

export function useLoginState(): UseLoginStateReturn {
	const { user, checkAuthState, signIn } = useAuthenticationStore(
		(state) => state
	);

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		checkAuthState();
	};

	return { user, handleSignIn };
}
