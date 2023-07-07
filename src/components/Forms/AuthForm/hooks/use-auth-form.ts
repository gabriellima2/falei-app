import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	UseFormSetValue,
	UseFormHandleSubmit,
	FieldErrors,
} from "react-hook-form";

import { userAuthSchema } from "@/validations/user-auth-validation";
import type { UserAuthRequestDTO } from "@/dtos/user-dtos/user-auth-dto";

type UseAuthFormReturn = {
	setValue: UseFormSetValue<UserAuthRequestDTO>;
	handleSubmit: UseFormHandleSubmit<UserAuthRequestDTO, undefined>;
	errors: FieldErrors<UserAuthRequestDTO>;
};

export function useAuthForm(): UseAuthFormReturn {
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
	}, []);

	return {
		setValue,
		handleSubmit,
		errors,
	};
}
