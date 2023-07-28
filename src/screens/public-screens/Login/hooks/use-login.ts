import { useRouter } from "expo-router";
import type { UserAuthRequestDTO } from "@/dtos";

export type UseLoginParams<T> = {
	authentication: (credentials: UserAuthRequestDTO) => Promise<T>;
};

type UseLoginReturn = {
	handleSignIn: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useLogin<T>(params: UseLoginParams<T>): UseLoginReturn {
	const { authentication } = params;
	const router = useRouter();

	const handleSignIn = async (credentials: UserAuthRequestDTO) => {
		await authentication(credentials);
		router.replace("(tabs)/");
	};

	return { handleSignIn };
}
