import { useState } from "react";

import {
	BreathingFormFields,
	useBreathingForm,
} from "@/hooks/use-breathing-form";
import { useToastContext } from "@/contexts/ToastContext";

import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm } from "@/ui/components";

import { createBreathingExerciseSchema } from "@/schemas";
import { reminderValidation } from "@/validations";
import { decrement } from "@/helpers/decrement";
import { increment } from "@/helpers/increment";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

export const CreateExercise = () => {
	const { fields, errors, setValue, handleSubmit } = useBreathingForm({
		schema: createBreathingExerciseSchema,
	});
	const [hasReminder, setHasReminder] = useState(false);
	const { notify } = useToastContext();

	const onSubmit = (values: BreathingFormFields) => {
		const validationMessage = reminderValidation(values, {
			hasReminder,
		});
		if (validationMessage) return notify(validationMessage, { type: "alert" });
		console.log(values);
	};

	return (
		<ScrollContainer>
			<Header title="Exercício de Respiração" />
			<BreathingForm.Root>
				<BreathingForm.Content>
					<BreathingForm.TitleField
						onChangeText={(v) => setValue("title", v)}
						errorMessage={errors.title?.message}
					/>
					<BreathingForm.RoundsField
						onChangeText={(v) => setValue("rounds", v)}
						errorMessage={errors.rounds?.message}
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
						errorMessage={
							errors.timer?.inhale?.message ||
							errors.timer?.hold?.message ||
							errors.timer?.exhale?.message
						}
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
