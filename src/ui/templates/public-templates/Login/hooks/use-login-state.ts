import { useRouter } from "expo-router";

import { useClearNavigation } from "@/hooks/use-clear-navigation";

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
	const clearNavigation = useClearNavigation([
		"(auth)/create-account",
		"(auth)/login",
	]);
	const router = useRouter();

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await signIn(credentials);
		clearNavigation();
		router.replace("(tabs)/");
	};

	return { handleSignIn };
}
