import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	UseFormSetValue,
	UseFormHandleSubmit,
	FieldErrors,
} from "react-hook-form";

import { refineFirebaseErrorCode } from "@/helpers/refine-firebase-error-code";
import { FIREBASE_ERROR_MESSAGES, UNEXPECTED_ERROR } from "@/errors";
import { userAuthSchema } from "@/validations/user-auth-validation";
import type { UserAuthRequestDTO } from "@/dtos/user-dtos/user-auth-dto";
import type { AuthFormProps } from "../AuthForm";

type UseAuthFormParams = Pick<AuthFormProps, "onSubmit">;

type UseAuthFormReturn = {
	isAuthenticating: boolean;
	authErrorMessage: string | null;
	errors: FieldErrors<UserAuthRequestDTO>;
	setValue: UseFormSetValue<UserAuthRequestDTO>;
	handleSubmit: UseFormHandleSubmit<UserAuthRequestDTO>;
	handleUserAuthentication: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useAuthForm(params: UseAuthFormParams): UseAuthFormReturn {
	const { onSubmit } = params;
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserAuthRequestDTO>({
		resolver: zodResolver(userAuthSchema),
	});

	useEffect(() => {
		register("email");
		register("password");
	}, []);

	const handleUserAuthentication = async (credentials: UserAuthRequestDTO) => {
		setIsAuthenticating(true);
		try {
			await onSubmit(credentials);
		} catch (err) {
			if (err instanceof FirebaseError) {
				const firebaseError = err as FirebaseError;
				const { cause } = refineFirebaseErrorCode(firebaseError.code);
				const errorMessage = FIREBASE_ERROR_MESSAGES[cause];
				if (errorMessage) return setAuthErrorMessage(errorMessage);
			}
			setAuthErrorMessage((err as Error).message ?? UNEXPECTED_ERROR);
		} finally {
			setIsAuthenticating(false);
		}
	};

	return {
		errors,
		authErrorMessage,
		isAuthenticating,
		setValue,
		handleSubmit,
		handleUserAuthentication,
	};
}
