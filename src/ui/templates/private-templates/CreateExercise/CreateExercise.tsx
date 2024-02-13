import { useState } from "react";
import { z } from "zod";

import {
	BreathingFormFields,
	useBreathingForm,
} from "@/hooks/use-breathing-form";

import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm } from "@/ui/components";

import { decrement } from "@/helpers/decrement";
import { increment } from "@/helpers/increment";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";
import { useToastContext } from "@/contexts/ToastContext";

const schema = z.object({
	title: z.string().min(1).max(50),
	rounds: z.number().int().min(1).max(10),
	timer: z.object({
		inhale: z.number().int().min(1).max(10),
		hold: z.number().int().min(1).max(10),
		exhale: z.number().int().min(1).max(10),
	}),
	days: z.array(z.string()).optional(),
	time: z.date().optional(),
});

export const CreateExercise = () => {
	const { fields, setValue, handleSubmit } = useBreathingForm();
	const [hasReminder, setHasReminder] = useState(false);
	const { notify } = useToastContext();

	const onSubmit = (values: BreathingFormFields) => {
		const result = schema.safeParse({
			...values,
			rounds: Number(values.rounds),
			timer: {
				inhale: Number(values.timer.inhale),
				hold: Number(values.timer.hold),
				exhale: Number(values.timer.exhale),
			},
		});
		if (!result.success) {
			return notify(result.error.errors[0].message, { type: "alert" });
		}
		if (hasReminder && !values.days.length) {
			return notify("Selecione os dias", { type: "alert" });
		}
		console.log(values);
	};

	return (
		<ScrollContainer>
			<Header title="Exercício de Respiração" />
			<BreathingForm.Root>
				<BreathingForm.Content>
					<BreathingForm.TitleField
						onChangeText={(v) => setValue("title", v)}
					/>
					<BreathingForm.RoundsField
						onChangeText={(v) => setValue("rounds", v)}
					/>
					<BreathingForm.Timer
						inhale={{
							value: fields.timer.inhale,
							onDecrement: () =>
								setValue("timer.inhale", decrement(fields.timer.inhale)),
							onIncrement: () =>
								setValue("timer.inhale", increment(fields.timer.inhale)),
						}}
						hold={{
							value: fields.timer.hold,
							onDecrement: () =>
								setValue("timer.hold", decrement(fields.timer.hold)),
							onIncrement: () =>
								setValue("timer.hold", increment(fields.timer.hold)),
						}}
						exhale={{
							value: fields.timer.exhale,
							onDecrement: () =>
								setValue("timer.exhale", decrement(fields.timer.exhale)),
							onIncrement: () =>
								setValue("timer.exhale", increment(fields.timer.exhale)),
						}}
					/>
					<BreathingForm.Schedule
						isEnabled={hasReminder}
						onToggle={setHasReminder}
						days={fields.days}
						time={fields.time}
						onDayChange={(days) => setValue("days", days as DaysOfTheWeek[])}
						onTimeChange={(date) => setValue("time", date ?? new Date())}
					/>
				</BreathingForm.Content>
				<BreathingForm.Footer>
					<BreathingForm.CancelButton />
					<BreathingForm.SubmitButton onPress={handleSubmit(onSubmit)} />
				</BreathingForm.Footer>
			</BreathingForm.Root>
		</ScrollContainer>
	);
};
