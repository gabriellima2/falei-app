import { FirebaseError } from "firebase/app";

import { useToastContext } from "@/contexts/ToastContext";

import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";
import { refineFirebaseErrorCode } from "@/helpers/refine-firebase-error-code";

export function useHandleServiceError() {
	const { notify } = useToastContext();

	const handleServiceError = (err: unknown) => {
		if (err instanceof FirebaseError) {
			const firebaseError = err as FirebaseError;
			const { cause } = refineFirebaseErrorCode(firebaseError.code);
			const errorMessage = FIREBASE_ERROR_MESSAGES[cause];
			if (errorMessage) return notify(errorMessage, { type: "alert" });
		}
		notify((err as Error).message ?? UNEXPECTED_ERROR, { type: "alert" });
	};

	return {
		handleServiceError,
	};
}
