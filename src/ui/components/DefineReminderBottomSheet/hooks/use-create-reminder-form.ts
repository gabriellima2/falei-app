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
import { createReminderSchema, type CreateReminderFields } from "@/schemas";

export type UseCreateReminderFormReturn = {
	fields: CreateReminderFields;
	errors: FieldErrors<CreateReminderFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<CreateReminderFields>;
	handleSubmit: UseFormHandleSubmit<CreateReminderFields, CreateReminderFields>;
};

export function useCreateReminderForm(): UseCreateReminderFormReturn {
	const defaultValues = getDefaultValues();
	const {
		formState: { isSubmitting, errors },
		register,
		setValue,
		control,
		handleSubmit,
	} = useForm<CreateReminderFields>({
		defaultValues,
		resolver: zodResolver(createReminderSchema),
	});
	const fields = useWatch({ control });

	useEffect(() => {
		register("days");
		register("time", { valueAsDate: true });
	}, []);

	return {
		fields: {
			time: fields.time || defaultValues.time,
			days: fields.days || defaultValues.days,
		},
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
	};
}
