import { useEffect } from "react";
import {
	useForm,
	useWatch,
	type UseFormHandleSubmit,
	type UseFormSetValue,
	type UseFormProps,
	type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { CreatePoemFields } from "@/schemas";

export type UsePoemFormParams = UseFormProps<CreatePoemFields> & {
	schema: z.ZodType<CreatePoemFields>;
};
export type UsePoemFormReturn = {
	fields: CreatePoemFields;
	errors: FieldErrors<CreatePoemFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<CreatePoemFields>;
	handleSubmit: UseFormHandleSubmit<CreatePoemFields, CreatePoemFields>;
};

const defaultValues: CreatePoemFields = {};

export function usePoemForm(params: UsePoemFormParams): UsePoemFormReturn {
	const { schema, ...rest } = params;
	const {
		formState: { isSubmitting, errors },
		register,
		setValue,
		control,
		handleSubmit,
	} = useForm<CreatePoemFields>({
		...rest,
		defaultValues: params?.defaultValues || defaultValues,
		resolver: zodResolver(schema),
	});
	const fields = useWatch({ control });

	// useEffect(() => {}, []);

	return {
		fields: {},
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
	};
}
