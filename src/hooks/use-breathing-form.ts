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
	hour: Date;
};

export type UseBreathingFormParams = UseFormProps<BreathingFormFields>;
export type UseBreathingFormReturn = {
	fields: BreathingFormFields;
	setValue: UseFormSetValue<BreathingFormFields>;
	handleSubmit: UseFormHandleSubmit<BreathingFormFields, undefined>;
};

const defaultValues: BreathingFormFields = {
	title: "",
	rounds: "",
	days: [],
	hour: new Date(),
	timer: { inhale: "1", hold: "1", exhale: "1" },
};

export function useBreathingForm(
	params?: UseBreathingFormParams
): UseBreathingFormReturn {
	const { register, setValue, control, handleSubmit } =
		useForm<BreathingFormFields>({
			...params,
			defaultValues: params?.defaultValues || defaultValues,
		});
	const fields = useWatch({ control });

	useEffect(() => {
		register("title");
		register("rounds", { setValueAs: (value) => parseInt(value) });
		register("timer");
		register("days");
		register("hour", { valueAsDate: true });
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
			hour: fields.hour || defaultValues.hour,
			timer: defaultTimerValues || defaultValues.timer,
			days: fields.days || defaultValues.days,
		},
		setValue,
		handleSubmit,
	};
}
