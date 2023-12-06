import { useToastContext } from "@/contexts/ToastContext";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { Authentication } from "@/@types/authentication";

export type UseCreateAccountStateParams<T> = {
	authentication: Authentication<T>;
};

type UseCreateAccountStateReturn = {
	handleSignUp: Authentication<void>;
};

export function useCreateAccountState<T>(
	params: UseCreateAccountStateParams<T>
): UseCreateAccountStateReturn {
	const { authentication } = params;
	const { notify } = useToastContext();

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await authentication(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	return { handleSignUp };
}
