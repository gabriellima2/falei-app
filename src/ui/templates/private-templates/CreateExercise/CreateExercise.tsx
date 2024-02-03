import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";

import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm, DayPickerProps } from "@/ui/components";

type Controls = "inhale" | "hold" | "exhale";
type Days = Pick<DayPickerProps, "values">["values"];

type Timer = Record<Controls, string>;

type Fields = {
	title: string;
	rounds: string;
	timer: Timer;
	days: Days;
	hour: Date;
};

export const CreateExercise = () => {
	const { register, setValue, control, handleSubmit } = useForm<Fields>({
		defaultValues: {
			days: [],
			hour: new Date(),
			timer: { inhale: "1", hold: "1", exhale: "1" },
		},
	});
	const days = useController({ name: "days", control });
	const hour = useController({ name: "hour", control });
	const inhale = useController({ name: "timer.inhale", control });
	const hold = useController({ name: "timer.hold", control });
	const exhale = useController({ name: "timer.exhale", control });

	const handleDecrement = (value: string) => {
		let formattedValue = Number(value);
		if (isNaN(formattedValue) || formattedValue === 1) return value;
		return (--formattedValue).toString();
	};

	const handleIncrement = (value: string) => {
		let formattedValue = Number(value);
		if (isNaN(formattedValue) || formattedValue === 10) return value;
		return (++formattedValue).toString();
	};

	useEffect(() => {
		register("title");
		register("rounds", { setValueAs: (value) => parseInt(value) });
		register("timer");
		register("days");
		register("hour", { valueAsDate: true });
	}, []);

	const onSubmit = (values: Fields) => {
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
							value: inhale.field.value,
							onDecrement: () =>
								setValue("timer.inhale", handleDecrement(inhale.field.value)),
							onIncrement: () =>
								setValue("timer.inhale", handleIncrement(inhale.field.value)),
						}}
						hold={{
							value: hold.field.value,
							onDecrement: () =>
								setValue("timer.hold", handleDecrement(hold.field.value)),
							onIncrement: () =>
								setValue("timer.hold", handleIncrement(hold.field.value)),
						}}
						exhale={{
							value: exhale.field.value,
							onDecrement: () =>
								setValue("timer.exhale", handleDecrement(exhale.field.value)),
							onIncrement: () =>
								setValue("timer.exhale", handleIncrement(exhale.field.value)),
						}}
					/>
					<BreathingForm.Schedule
						defaultEnabled
						days={days.field.value}
						hour={hour.field.value}
						onDayChange={(days) => setValue("days", days as Days)}
						onHourChange={(hour) => setValue("hour", hour ?? new Date())}
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
