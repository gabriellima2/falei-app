import { useEffect } from "react";
import { z } from "zod";
import {
	useForm,
	FieldErrors,
	UseFormSetValue,
	UseFormHandleSubmit,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleServiceError } from "@/hooks/use-handle-service-error";
import { emailConstraint } from "@/schemas/generic-constraints";

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
	} = useForm<Credentials>({
		resolver: zodResolver(z.object({ email: emailConstraint })),
	});

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
