import { useRouter } from "expo-router";

import { useClearNavigation } from "@/hooks/use-clear-navigation";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { Authentication } from "@/@types/authentication";

export type UseLoginParams<T> = {
	authentication: Authentication<T>;
};

type UseLoginReturn = {
	handleSignIn: Authentication<void>;
};

export function useLogin<T>(params: UseLoginParams<T>): UseLoginReturn {
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
