import { useState } from "react";
import { FirebaseError } from "firebase/app";

import { useRedirectAfterAuthentication } from "@/hooks/use-redirect-after-authentication";
import { useToastContext } from "@/contexts/ToastContext";

import { refineFirebaseErrorCode } from "@/helpers/refine-firebase-error-code";
import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";

import type { AuthenticationAdapter } from "@/adapters/authentication.adapter";
import type { AuthInputDTO } from "@/dtos/auth.dto";

export type UseCreateAccountStateParams = {
	signUp: Pick<AuthenticationAdapter, "signUp">["signUp"];
	anonymous: Pick<AuthenticationAdapter, "anonymous">["anonymous"];
};

type UseCreateAccountStateReturn = {
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
	const { redirect } = useRedirectAfterAuthentication();

	const handleSignUp = async (credentials: AuthInputDTO) => {
		await signUp(credentials);
		notify("Conta criada com sucesso", { type: "success" });
	};

	const handleAnonymous = async () => {
		setIsLoadingAsAnonymous(true);
		try {
			await anonymous();
			redirect();
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

	return { isLoadingAsAnonymous, handleSignUp, handleAnonymous };
}
