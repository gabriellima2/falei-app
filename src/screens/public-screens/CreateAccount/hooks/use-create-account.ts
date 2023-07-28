import { useToastContext } from "@/contexts/ToastContext";
import type { UserAuthRequestDTO } from "@/dtos";

export type UseCreateAccountParams<T> = {
	authentication: (credentials: UserAuthRequestDTO) => Promise<T>;
};

type UseCreateAccountReturn = {
	handleSignUp: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useCreateAccount<T>(
	params: UseCreateAccountParams<T>
): UseCreateAccountReturn {
	const { authentication } = params;
	const { notify } = useToastContext();

	const handleSignUp = async (credentials: UserAuthRequestDTO) => {
		await authentication(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	return { handleSignUp };
}
