import { useEffect } from "react";
import {
	useForm,
	useWatch,
	type UseFormHandleSubmit,
	type UseFormSetValue,
	type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPoemSchema, type CreatePoemFields } from "@/schemas";

export type UsePoemFormReturn = {
	fields: CreatePoemFields;
	errors: FieldErrors<CreatePoemFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<CreatePoemFields>;
	handleSubmit: UseFormHandleSubmit<CreatePoemFields, CreatePoemFields>;
};

const defaultValues: CreatePoemFields = {
	content: "",
	credits: { author: "", workName: "" },
};

export function usePoemForm(): UsePoemFormReturn {
	const {
		formState: { isSubmitting, errors },
		register,
		control,
		setValue,
		handleSubmit,
	} = useForm<CreatePoemFields>({
		defaultValues,
		resolver: zodResolver(createPoemSchema),
	});
	const fields = useWatch({ control });

	useEffect(() => {
		register("content");
		register("credits");
	}, []);

	return {
		fields: {
			content: fields.content || defaultValues.content,
			credits: fields.credits || defaultValues.credits,
		},
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
	};
}
