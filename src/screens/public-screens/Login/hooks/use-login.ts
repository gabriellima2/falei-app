import { useRouter } from "expo-router";

import type { UserAuthInputDTO } from "@/dtos";
import type { Authentication } from "@/@types/authentication";

export type UseLoginParams<T> = {
	authentication: Authentication<T>;
};

type UseLoginReturn = {
	handleSignIn: Authentication<void>;
};

export function useLogin<T>(params: UseLoginParams<T>): UseLoginReturn {
	const { authentication } = params;
	const router = useRouter();

	const handleSignIn = async (credentials: UserAuthInputDTO) => {
		await authentication(credentials);
		router.replace("(tabs)/");
	};

	return { handleSignIn };
}
