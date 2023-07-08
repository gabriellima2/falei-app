import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	UseFormSetValue,
	UseFormHandleSubmit,
	FieldErrors,
} from "react-hook-form";

import { userAuthSchema } from "@/validations/user-auth-validation";
import type { UserAuthRequestDTO } from "@/dtos/user-dtos/user-auth-dto";
import type { AuthFormProps } from "../AuthForm";

type UseAuthFormParams = Pick<AuthFormProps, "onSubmit">;

type UseAuthFormReturn = {
	isAuthenticating: boolean;
	errors: FieldErrors<UserAuthRequestDTO>;
	setValue: UseFormSetValue<UserAuthRequestDTO>;
	handleSubmit: UseFormHandleSubmit<UserAuthRequestDTO>;
	handleUserAuthentication: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useAuthForm(params: UseAuthFormParams): UseAuthFormReturn {
	const { onSubmit } = params;
	const [isAuthenticating, setIsAuthenticating] = useState(false);
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
			console.error(err);
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
