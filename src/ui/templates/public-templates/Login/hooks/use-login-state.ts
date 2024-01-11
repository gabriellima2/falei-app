import { useAuthStore } from "@/store/auth-store";
import type { AuthInputDTO } from "@/dtos/auth.dto";

type UseLoginStateReturn = {
	handleSignIn: (credentials: AuthInputDTO) => Promise<void>;
};

export function useLoginState(): UseLoginStateReturn {
	const { checkAuthState, signIn } = useAuthStore((state) => state);

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		checkAuthState();
	};

	return { handleSignIn };
}
