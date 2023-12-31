import type { AuthenticationAdapter } from "@/adapters/authentication.adapter";
import type { AuthInputDTO } from "@/dtos/auth.dto";
import { useAuthStore } from "@/store/auth-store";

export type UseLoginStateParams = {
	signIn: Pick<AuthenticationAdapter, "signIn">["signIn"];
};

type UseLoginStateReturn = {
	handleSignIn: (credentials: AuthInputDTO) => Promise<void>;
};

export function useLoginState(
	params: UseLoginStateParams
): UseLoginStateReturn {
	const { signIn } = params;
	const { checkAuthState } = useAuthStore((state) => state);

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		checkAuthState();
	};

	return { handleSignIn };
}
