import { useState } from "react";
import { useRouter } from "expo-router";

import { useToastContext } from "@/contexts/ToastContext";
import { useAuthenticationStore } from "@/store/authentication-store";
import { useHandleServiceError } from "@/hooks/use-handle-service-error";

import type { UserEntity } from "@/entities/user.entity";
import type { AuthInputDTO } from "@/dtos/auth.dto";

type UseCreateAccountStateReturn = {
	user: Omit<UserEntity, "password"> | null;
	wasAnonymousAuthUsed: boolean;
	isLoadingAsAnonymous: boolean;
	handleSignUp: (credentials: AuthInputDTO) => Promise<void>;
	handleAnonymous: () => Promise<void>;
};

export function useCreateAccountState(): UseCreateAccountStateReturn {
	const { handleServiceError } = useHandleServiceError();
	const [wasAnonymousAuthUsed, setWasAnonymousAuthUsed] = useState(false);
	const [isLoadingAsAnonymous, setIsLoadingAsAnonymous] = useState(false);
	const { user, checkAuthState, signUp, anonymous } = useAuthenticationStore(
		(state) => state
	);
	const { notify } = useToastContext();
	const router = useRouter();

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await signUp(credentials);
		notify("Conta criada com sucesso", { type: "success" });
		router.replace({ pathname: "(auth)/email-verification" });
	};

	const handleAnonymous = async () => {
		setIsLoadingAsAnonymous(true);
		try {
			await anonymous();
			setWasAnonymousAuthUsed(true);
			checkAuthState();
		} catch (err) {
			handleServiceError(err);
		} finally {
			setIsLoadingAsAnonymous(false);
		}
	};

	return {
		user,
		wasAnonymousAuthUsed,
		isLoadingAsAnonymous,
		handleSignUp,
		handleAnonymous,
	};
}
