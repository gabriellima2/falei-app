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
import type { UserAuthInputDTO } from "@/dtos/user-dtos";
import type { AuthFormProps } from "../AuthForm";
import { useToastContext } from "@/contexts/ToastContext";

type UseAuthFormParams = Pick<AuthFormProps, "onSubmit">;

type UseAuthFormReturn = {
	isAuthenticating: boolean;
	errors: FieldErrors<UserAuthInputDTO>;
	setValue: UseFormSetValue<UserAuthInputDTO>;
	handleSubmit: UseFormHandleSubmit<UserAuthInputDTO>;
	handleUserAuthentication: (credentials: UserAuthInputDTO) => Promise<void>;
};

export function useAuthForm(params: UseAuthFormParams): UseAuthFormReturn {
	const { onSubmit } = params;
	const { notify } = useToastContext();
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserAuthInputDTO>({
		resolver: zodResolver(userAuthSchema),
	});

	useEffect(() => {
		register("email");
		register("password");
	}, []);

	const handleUserAuthentication = async (credentials: UserAuthInputDTO) => {
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
		handleUserAuthentication,
	};
}
