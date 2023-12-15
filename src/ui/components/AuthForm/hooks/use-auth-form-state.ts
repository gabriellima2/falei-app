import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	FieldErrors,
	UseFormSetValue,
	UseFormHandleSubmit,
} from "react-hook-form";

import { useToastContext } from "@/contexts/ToastContext";

import { refineFirebaseErrorCode } from "@/helpers/refine-firebase-error-code";
import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";
import { userAuthSchema } from "@/validations/user-auth-validation";

import type { AuthInputDTO } from "@/dtos/auth.dto";
import type { AuthFormProps } from "../AuthForm";

export type UseAuthFormStateParams = Pick<AuthFormProps, "onSubmit">;

type UseAuthFormStateReturn = {
	isAuthenticating: boolean;
	errors: FieldErrors<AuthInputDTO>;
	setValue: UseFormSetValue<AuthInputDTO>;
	handleSubmit: UseFormHandleSubmit<AuthInputDTO, undefined>;
	handleAuthentication: (credentials: AuthInputDTO) => Promise<void>;
};

export function useAuthFormState(
	params: UseAuthFormStateParams
): UseAuthFormStateReturn {
	const { onSubmit } = params;
	const { notify } = useToastContext();
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthInputDTO>({
		resolver: zodResolver(userAuthSchema),
	});

	useEffect(() => {
		register("email");
		register("password");
	}, []);

	const handleAuthentication = async (credentials: AuthInputDTO) => {
		setIsAuthenticating(true);
		try {
			await onSubmit(credentials);
		} catch (err) {
			if (err instanceof FirebaseError) {
				const firebaseError = err as FirebaseError;
				const { cause } = refineFirebaseErrorCode(firebaseError.code);
				const errorMessage = FIREBASE_ERROR_MESSAGES[cause];
				if (errorMessage) return notify(errorMessage, { type: "alert" });
			}
			notify((err as Error).message ?? UNEXPECTED_ERROR, { type: "alert" });
		} finally {
			setIsAuthenticating(false);
		}
	};

	return {
		errors,
		isAuthenticating,
		setValue,
		handleSubmit,
		handleAuthentication,
	};
}
