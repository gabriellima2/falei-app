import { useState } from "react";
import { Redirect } from "expo-router";
import styled, { css } from "styled-components/native";

import { useCreateBreathingExerciseForm } from "./hooks/use-create-breathing-exercise-form";
import { useCreateBreathingExercise } from "./hooks/use-create-breathing-exercise";
import { useAuthenticationStore } from "@/store/authentication-store";

import {
	ScrollContainer,
	Header,
	Form,
	Typography,
	TextError,
	ContainerWithDefaultSpaces,
	ToggleButton,
} from "@/ui/atoms";
import { BreathingControl, Field, Reminder } from "@/ui/components";

import { decrement } from "@/helpers/decrement";
import { increment } from "@/helpers/increment";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

export const CreateBreathingExercise = () => {
	const { user } = useAuthenticationStore();
	const { handleCreate } = useCreateBreathingExercise();
	const [hasReminder, setHasReminder] = useState(false);
	const { fields, errors, setValue, isSubmitting, handleSubmit } =
		useCreateBreathingExerciseForm();

	if (!user) return <Redirect href="/(auth)/login" />;

	const stepsError =
		errors.steps?.inhale?.message ||
		errors.steps?.hold?.message ||
		errors.steps?.exhale?.message;

	return (
		<ScrollContainer>
			<Header title="Exercício de Respiração" />
			<Form.Root>
				<Form.Content>
					<Field
						labelText="Título"
						labelId="title"
						placeholder="Ex: Respiração Regular"
						onChangeText={(v) => setValue("title", v)}
						errorMessage={errors.title?.message}
					/>
					<Field
						labelText="Repetições"
						labelId="rounds"
						placeholder="Vezes que você irá repetir a respiração"
						keyboardType="numeric"
						onChangeText={(v) => setValue("rounds", v)}
						errorMessage={errors.rounds?.message}
					/>
					<Section>
						<SectionContainerTitle>
							<SectionTitle>Temporizadores</SectionTitle>
							<Typography.Small>(Segundos)</Typography.Small>
						</SectionContainerTitle>
						<BreathingControl.Root>
							<BreathingControl.Inhale
								value={fields.steps.inhale}
								onDecrement={() =>
									setValue("steps.inhale", decrement(fields.steps.inhale))
								}
								onIncrement={() =>
									setValue("steps.inhale", increment(fields.steps.inhale))
								}
							/>
							<BreathingControl.Hold
								value={fields.steps.hold}
								onDecrement={() =>
									setValue("steps.hold", decrement(fields.steps.hold))
								}
								onIncrement={() =>
									setValue("steps.hold", increment(fields.steps.hold))
								}
							/>
							<BreathingControl.Exhale
								value={fields.steps.exhale}
								onDecrement={() =>
									setValue("steps.exhale", decrement(fields.steps.exhale))
								}
								onIncrement={() =>
									setValue("steps.exhale", increment(fields.steps.exhale))
								}
							/>
						</BreathingControl.Root>
						{stepsError && <TextError>{stepsError}</TextError>}
					</Section>
					<SectionContainerTitle>
						<ToggleButton value={hasReminder} onValueChange={setHasReminder} />
						<Typography.Paragraph>Definir Lembrete</Typography.Paragraph>
					</SectionContainerTitle>
					{hasReminder && (
						<Reminder.Root>
							<Reminder.Day
								values={(fields.days || []) as DaysOfTheWeek[]}
								onChange={(days) => setValue("days", days as DaysOfTheWeek[])}
							/>
							<Reminder.Time
								value={fields.time || new Date()}
								onChange={(date) => setValue("time", date ?? new Date())}
							/>
						</Reminder.Root>
					)}
				</Form.Content>
				<Form.Footer>
					<Form.Buttons.Cancel />
					<Form.Buttons.Submit
						isSubmitting={isSubmitting}
						onPress={handleSubmit((values) =>
							handleCreate(user.id, hasReminder, values)
						)}
					/>
				</Form.Footer>
			</Form.Root>
		</ScrollContainer>
	);
};

const Section = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;

const SectionContainerTitle = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`;

const SectionTitle = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
	`}
`;

/*
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
*/
