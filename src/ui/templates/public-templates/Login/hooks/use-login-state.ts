import { useAuthenticationStore } from "@/store/authentication-store";
import type { AuthInputDTO } from "@/dtos/auth.dto";

type UseLoginStateReturn = {
	handleSignIn: (credentials: AuthInputDTO) => Promise<void>;
};

export function useLoginState(): UseLoginStateReturn {
	const { checkAuthState, signIn } = useAuthenticationStore((state) => state);

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		checkAuthState();
	};

	return { handleSignIn };
}
