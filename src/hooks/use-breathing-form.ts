import { useEffect } from "react";
import {
	useForm,
	useWatch,
	type UseFormHandleSubmit,
	type UseFormSetValue,
	type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createBreathingExerciseSchema } from "@/schemas";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";
import type { BreathingStates } from "@/@types/breathing-states";

export type BreathingFormFields = {
	title: string;
	rounds: string;
	steps: Record<BreathingStates, string>;
	days: DaysOfTheWeek[];
	time: Date;
};

export type UseBreathingFormReturn = {
	fields: BreathingFormFields;
	errors: FieldErrors<BreathingFormFields>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<BreathingFormFields>;
	handleSubmit: UseFormHandleSubmit<BreathingFormFields, BreathingFormFields>;
};

const defaultValues: BreathingFormFields = {
	title: "",
	rounds: "",
	days: [],
	time: new Date(),
	steps: { inhale: "1", hold: "1", exhale: "1" },
};

export function useBreathingForm(): UseBreathingFormReturn {
	const {
		formState: { isSubmitting, errors },
		register,
		setValue,
		control,
		handleSubmit,
	} = useForm<BreathingFormFields>({
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
