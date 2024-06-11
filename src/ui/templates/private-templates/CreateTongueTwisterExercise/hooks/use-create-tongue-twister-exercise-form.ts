import { useEffect } from "react";
import {
	useForm,
	useWatch,
	type UseFormHandleSubmit,
	type UseFormSetValue,
	type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getDefaultValues } from "../utils/get-default-values";
import {
	createTongueTwisterSchema,
	type CreateTongueTwisterFields,
} from "@/schemas";

export type UseCreateTongueTwisterExerciseFormReturn = {
	fields: CreateTongueTwisterFields;
	errors: FieldErrors<CreateTongueTwisterFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<CreateTongueTwisterFields>;
	handleSubmit: UseFormHandleSubmit<
		CreateTongueTwisterFields,
		CreateTongueTwisterFields
	>;
};

export function useCreateTongueTwisterExerciseForm(): UseCreateTongueTwisterExerciseFormReturn {
	const defaultValues = getDefaultValues();
	const {
		formState: { isSubmitting, errors },
		register,
		control,
		setValue,
		handleSubmit,
	} = useForm<CreateTongueTwisterFields>({
		defaultValues,
		resolver: zodResolver(createTongueTwisterSchema),
	});
	const fields = useWatch({ control });

	useEffect(() => {
		register("content");
		register("author");
	}, []);

	return {
		fields: {
			content: fields.content || defaultValues.content,
			author: fields.author || defaultValues.author,
		},
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
	};
}
