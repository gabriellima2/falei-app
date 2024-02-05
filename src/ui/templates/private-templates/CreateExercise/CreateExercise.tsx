import { useBreathingForm } from "@/hooks/use-breathing-form";

import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm } from "@/ui/components";

import { decrement } from "@/helpers/decrement";
import { increment } from "@/helpers/increment";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

export const CreateExercise = () => {
	const { fields, setValue, handleSubmit } = useBreathingForm();
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
						defaultEnabled
						days={fields.days}
						hour={fields.hour}
						onDayChange={(days) => setValue("days", days as DaysOfTheWeek[])}
						onHourChange={(hour) => setValue("hour", hour ?? new Date())}
					/>
				</BreathingForm.Content>
				<BreathingForm.Footer>
					<BreathingForm.CancelButton />
					<BreathingForm.SubmitButton
						onPress={handleSubmit((v) => console.log(v))}
					/>
				</BreathingForm.Footer>
			</BreathingForm.Root>
		</ScrollContainer>
	);
};
