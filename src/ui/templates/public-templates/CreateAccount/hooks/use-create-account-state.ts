import { useToastContext } from "@/contexts/ToastContext";

import type { AuthenticationAdapter } from "@/adapters/authentication.adapter";
import type { AuthInputDTO } from "@/dtos/auth.dto";

export type UseCreateAccountStateParams = {
	signUp: Pick<AuthenticationAdapter, "signUp">["signUp"];
};

type UseCreateAccountStateReturn = {
	handleSignUp: (credentials: AuthInputDTO) => Promise<void>;
};

export function useCreateAccountState(
	params: UseCreateAccountStateParams
): UseCreateAccountStateReturn {
	const { signUp } = params;
	const { notify } = useToastContext();

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await signUp(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	return { handleSignUp };
}
