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
	createBreathingExerciseSchema,
	type CreateBreathingExerciseFields,
} from "@/schemas";

export type UseBreathingFormReturn = {
	fields: CreateBreathingExerciseFields;
	errors: FieldErrors<CreateBreathingExerciseFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<CreateBreathingExerciseFields>;
	handleSubmit: UseFormHandleSubmit<
		CreateBreathingExerciseFields,
		CreateBreathingExerciseFields
	>;
};

export function useBreathingForm(): UseBreathingFormReturn {
	const defaultValues = getDefaultValues();
	const {
		formState: { isSubmitting, errors },
		register,
		setValue,
		control,
		handleSubmit,
	} = useForm<CreateBreathingExerciseFields>({
		defaultValues,
		resolver: zodResolver(createBreathingExerciseSchema),
	});
	const fields = useWatch({ control });

	useEffect(() => {
		register("title");
		register("rounds");
		register("steps");
		register("days");
		register("time", { valueAsDate: true });
	}, []);

	const defaultSteps = fields.steps && {
		inhale: fields.steps.inhale || defaultValues.steps.inhale,
		hold: fields.steps.hold || defaultValues.steps.hold,
		exhale: fields.steps.exhale || defaultValues.steps.exhale,
	};

	return {
		fields: {
			title: fields.title || defaultValues.title,
			rounds: fields.rounds || defaultValues.rounds,
			time: fields.time || defaultValues.time,
			steps: defaultSteps || defaultValues.steps,
			days: fields.days || defaultValues.days,
		},
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
	};
}
