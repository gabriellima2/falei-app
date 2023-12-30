import { useRedirectAfterAuthentication } from "@/hooks/use-redirect-after-authentication";

import type { AuthenticationAdapter } from "@/adapters/authentication.adapter";
import type { AuthInputDTO } from "@/dtos/auth.dto";

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
	const { redirect } = useRedirectAfterAuthentication();

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		redirect();
	};

	return { handleSignIn };
}
