import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	FieldErrors,
	UseFormSetValue,
	UseFormHandleSubmit,
} from "react-hook-form";

import { useHandleServiceError } from "@/hooks/use-handle-service-error";

import { userAuthSchema } from "@/validations/user-auth-validation";

import type { AuthInputDTO } from "@/dtos/auth.dto";

export type UseAuthFormStateParams = {
	authenticationService: (params: AuthInputDTO) => Promise<void> | void;
};

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
	const { authenticationService } = params;
	const { handleServiceError } = useHandleServiceError();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AuthInputDTO>({
		resolver: zodResolver(userAuthSchema),
	});

	useEffect(() => {
		register("email");
		register("password");
	}, []);

	const handleAuthentication = async (credentials: AuthInputDTO) => {
		try {
			await authenticationService(credentials);
		} catch (err) {
			handleServiceError(err);
		}
	};

	return {
		errors,
		isAuthenticating: isSubmitting,
		setValue,
		handleSubmit,
		handleAuthentication,
	};
}
