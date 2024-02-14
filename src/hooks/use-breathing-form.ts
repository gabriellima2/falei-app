import { useEffect } from "react";
import {
	useForm,
	useWatch,
	type UseFormHandleSubmit,
	type UseFormSetValue,
	type UseFormProps,
} from "react-hook-form";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";
import type { BreathingStates } from "@/@types/breathing-states";

export type BreathingFormFields = {
	title: string;
	rounds: string;
	timer: Record<BreathingStates, string>;
	days: DaysOfTheWeek[];
	time: Date;
};

export type UseBreathingFormParams = UseFormProps<BreathingFormFields>;
export type UseBreathingFormReturn = {
	fields: BreathingFormFields;
	isSubmitting: boolean;
	setValue: UseFormSetValue<BreathingFormFields>;
	handleSubmit: UseFormHandleSubmit<BreathingFormFields, undefined>;
};

const defaultValues: BreathingFormFields = {
	title: "",
	rounds: "",
	days: [],
	time: new Date(),
	timer: { inhale: "1", hold: "1", exhale: "1" },
};

export function useBreathingForm(
	params?: UseBreathingFormParams
): UseBreathingFormReturn {
	const {
		formState: { isSubmitting },
		register,
		setValue,
		control,
		handleSubmit,
	} = useForm<BreathingFormFields>({
		...params,
		defaultValues: params?.defaultValues || defaultValues,
	});
	const fields = useWatch({ control });

	useEffect(() => {
		register("title");
		register("rounds");
		register("timer");
		register("days");
		register("time", { valueAsDate: true });
	}, []);

	const defaultTimerValues = fields.timer && {
		inhale: fields.timer.inhale || defaultValues.timer.inhale,
		hold: fields.timer.hold || defaultValues.timer.hold,
		exhale: fields.timer.exhale || defaultValues.timer.exhale,
	};

	return {
		fields: {
			title: fields.title || defaultValues.title,
			rounds: fields.rounds || defaultValues.rounds,
			time: fields.time || defaultValues.time,
			timer: defaultTimerValues || defaultValues.timer,
			days: fields.days || defaultValues.days,
		},
		isSubmitting,
		setValue,
		handleSubmit,
	};
}
