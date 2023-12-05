import { useRouter } from "expo-router";

import { useClearNavigation } from "@/hooks/use-clear-navigation";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { Authentication } from "@/@types/authentication";

export type UseLoginStateParams<T> = {
	authentication: Authentication<T>;
};

type UseLoginStateReturn = {
	handleSignIn: Authentication<void>;
};

export function useLoginState<T>(
	params: UseLoginStateParams<T>
): UseLoginStateReturn {
	const { authentication } = params;
	const clearNavigation = useClearNavigation([
		"(auth)/create-account",
		"(auth)/login",
	]);
	const router = useRouter();

	const handleSignIn = async (credentials: AuthInputDTO) => {
		await authentication(credentials);
		clearNavigation();
		router.replace("(tabs)/");
	};

	return { handleSignIn };
}
