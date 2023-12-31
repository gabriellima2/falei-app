import { useState } from "react";
import { FirebaseError } from "firebase/app";

import { useToastContext } from "@/contexts/ToastContext";
import { useAuthStore } from "@/store/auth-store";

import { refineFirebaseErrorCode } from "@/helpers/refine-firebase-error-code";
import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";

import type { AuthenticationAdapter } from "@/adapters/authentication.adapter";
import type { UserEntity } from "@/entities/user.entity";
import type { AuthInputDTO } from "@/dtos/auth.dto";

export type UseCreateAccountStateParams = {
	signUp: Pick<AuthenticationAdapter, "signUp">["signUp"];
	anonymous: Pick<AuthenticationAdapter, "anonymous">["anonymous"];
};

type UseCreateAccountStateReturn = {
	user: Omit<UserEntity, "password"> | null;
	isLoadingAsAnonymous: boolean;
	handleSignUp: (credentials: AuthInputDTO) => Promise<void>;
	handleAnonymous: () => Promise<void>;
};

export function useCreateAccountState(
	params: UseCreateAccountStateParams
): UseCreateAccountStateReturn {
	const { signUp, anonymous } = params;
	const [isLoadingAsAnonymous, setIsLoadingAsAnonymous] = useState(false);
	const { notify } = useToastContext();
	const { user, checkAuthState } = useAuthStore((state) => state);

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await signUp(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	const handleAnonymous = async () => {
		setIsLoadingAsAnonymous(true);
		try {
			await anonymous();
			checkAuthState();
		} catch (err) {
			if (err instanceof FirebaseError) {
				const firebaseError = err as FirebaseError;
				const { cause } = refineFirebaseErrorCode(firebaseError.code);
				const errorMessage = FIREBASE_ERROR_MESSAGES[cause];
				if (errorMessage) return notify(errorMessage, { type: "alert" });
			}
			notify((err as Error).message ?? UNEXPECTED_ERROR, { type: "alert" });
		} finally {
			setIsLoadingAsAnonymous(false);
		}
	};

	return { user, isLoadingAsAnonymous, handleSignUp, handleAnonymous };
}
