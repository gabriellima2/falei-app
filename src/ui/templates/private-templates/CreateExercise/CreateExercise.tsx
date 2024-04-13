import { useState } from "react";
import { Redirect, useRouter } from "expo-router";

import {
	useBreathingForm,
	type BreathingFormFields,
} from "@/hooks/use-breathing-form";
import { useToastContext } from "@/contexts/ToastContext";
import { useAuthenticationStore } from "@/store/authentication-store";

import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm } from "@/ui/components";

import { createBreathingExerciseSchema } from "@/schemas";
import { reminderValidation } from "@/validations";
import { decrement } from "@/helpers/decrement";
import { increment } from "@/helpers/increment";

import { UNEXPECTED_ERROR } from "@/errors";

import { makeBreathingService } from "@/factories/services/make-breathing-service";
import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

const service = makeBreathingService();

export const CreateExercise = () => {
	const { fields, errors, setValue, isSubmitting, handleSubmit } =
		useBreathingForm({
			schema: createBreathingExerciseSchema,
		});
	const [hasReminder, setHasReminder] = useState(false);
	const { user } = useAuthenticationStore();
	const { notify } = useToastContext();
	const router = useRouter();

	if (!user) return <Redirect href="/(auth)/login" />;

	const onSubmit = async (values: BreathingFormFields) => {
		const validationMessage = reminderValidation(values, {
			hasReminder,
		});
		if (validationMessage) return notify(validationMessage, { type: "alert" });
		try {
			await service.create(user.id, values);
			notify("Exercício criado com sucesso", { type: "success" });
			router.push("/(tabs)/(exercises)");
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
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
							value: fields.steps.inhale,
							onDecrement: () =>
								setValue("steps.inhale", decrement(fields.steps.inhale)),
							onIncrement: () =>
								setValue("steps.inhale", increment(fields.steps.inhale)),
						}}
						hold={{
							value: fields.steps.hold,
							onDecrement: () =>
								setValue("steps.hold", decrement(fields.steps.hold)),
							onIncrement: () =>
								setValue("steps.hold", increment(fields.steps.hold)),
						}}
						exhale={{
							value: fields.steps.exhale,
							onDecrement: () =>
								setValue("steps.exhale", decrement(fields.steps.exhale)),
							onIncrement: () =>
								setValue("steps.exhale", increment(fields.steps.exhale)),
						}}
						errorMessage={
							errors.steps?.inhale?.message ||
							errors.steps?.hold?.message ||
							errors.steps?.exhale?.message
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
					<BreathingForm.SubmitButton
						isSubmitting={isSubmitting}
						onPress={handleSubmit(onSubmit)}
					/>
				</BreathingForm.Footer>
			</BreathingForm.Root>
		</ScrollContainer>
	);
};
