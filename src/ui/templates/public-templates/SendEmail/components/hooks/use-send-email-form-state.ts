import { useEffect } from "react";
import {
	useForm,
	FieldErrors,
	UseFormSetValue,
	UseFormHandleSubmit,
} from "react-hook-form";

import { useHandleServiceError } from "@/hooks/use-handle-service-error";

type Credentials = { email: string };

export type UseSendEmailFormStateParams = {
	resetPasswordService: (credentials: Credentials) => Promise<void>;
};

export type UseSendEmailFormStateReturn = {
	isSubmitting: boolean;
	errors: FieldErrors<Credentials>;
	setValue: UseFormSetValue<Credentials>;
	handleSubmit: UseFormHandleSubmit<Credentials, undefined>;
	handleSendPasswordResetEmail: (credentials: Credentials) => Promise<void>;
};

export function useSendEmailFormState(
	params: UseSendEmailFormStateParams
): UseSendEmailFormStateReturn {
	const { resetPasswordService } = params;
	const { handleServiceError } = useHandleServiceError();
	const {
		formState: { errors, isSubmitting },
		register,
		setValue,
		handleSubmit,
	} = useForm<Credentials>();

	useEffect(() => {
		register("email");
	}, []);

	const handleSendPasswordResetEmail = async (credentials: Credentials) => {
		try {
			await resetPasswordService(credentials);
		} catch (err) {
			handleServiceError(err);
		}
	};

	return {
		errors,
		isSubmitting,
		setValue,
		handleSubmit,
		handleSendPasswordResetEmail,
	};
}
