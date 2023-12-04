import { useToastContext } from "@/contexts/ToastContext";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { Authentication } from "@/@types/authentication";

export type UseCreateAccountParams<T> = {
	authentication: Authentication<T>;
};

type UseCreateAccountReturn = {
	handleSignUp: Authentication<void>;
};

export function useCreateAccount<T>(
	params: UseCreateAccountParams<T>
): UseCreateAccountReturn {
	const { authentication } = params;
	const { notify } = useToastContext();

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await authentication(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	return { handleSignUp };
}
