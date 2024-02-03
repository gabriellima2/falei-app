import { useState, type ReactNode } from "react";
import styled, { css } from "styled-components/native";

import {
	Typography,
	BaseButton,
	ToggleButton,
	ContainerWithDefaultSpaces,
	type BaseButtonProps,
	type ContainerWithDefaultSpacesProps,
} from "@/ui/atoms";
import { BreathingControl, DefaultControlProps } from "../BreathingControl";
import { Field, type FieldProps } from "../Fields";
import { Reminder } from "../Reminder";

import type { HourPickerProps } from "../HourPicker";
import type { DayPickerProps } from "../DayPicker";
import { useRouter } from "expo-router";

type ContainerDefaultProps = Omit<
	ContainerWithDefaultSpacesProps,
	"children"
> & {
	children?: ReactNode | ReactNode[];
};

type FieldDefaultProps = Omit<
	FieldProps,
	"labelText" | "labelId" | "placeholder"
>;

type TimerProps = {
	inhale: DefaultControlProps;
	hold: DefaultControlProps;
	exhale: DefaultControlProps;
};

type ScheduleProps = {
	defaultEnabled?: boolean;
	days: Pick<DayPickerProps, "values">["values"];
	hour: Pick<HourPickerProps, "value">["value"];
	onHourChange: Pick<HourPickerProps, "onChange">["onChange"];
	onDayChange: Pick<DayPickerProps, "onChange">["onChange"];
};

const Root = (props: ContainerDefaultProps) => (
	<Container horizontalSpacing {...props} />
);

const Content = (props: ContainerDefaultProps) => <Container {...props} />;

const TitleField = (props: FieldDefaultProps) => (
	<Field
		labelText="Título"
		labelId="title"
		placeholder="Ex: Respiração Regular"
		{...props}
	/>
);

const RoundsField = (props: FieldDefaultProps) => (
	<Field
		labelText="Repetições"
		labelId="rounds"
		placeholder="Vezes que você irá repetir a respiração"
		{...props}
	/>
);

const Timer = (props: TimerProps) => {
	const { inhale, hold, exhale } = props;
	return (
		<Container>
			<TimerText>
				<Title>Temporizadores</Title>
				<Typography.Small>(Segundos)</Typography.Small>
			</TimerText>
			<BreathingControl.Root>
				<BreathingControl.Inhale {...inhale} />
				<BreathingControl.Hold {...hold} />
				<BreathingControl.Exhale {...exhale} />
			</BreathingControl.Root>
		</Container>
	);
};

const Schedule = (props: ScheduleProps) => {
	const { defaultEnabled, days, hour, onDayChange, onHourChange } = props;
	const [isEnabled, setIsEnabled] = useState(defaultEnabled);
	return (
		<>
			<ScheduleText>
				<ToggleButton value={isEnabled} onValueChange={setIsEnabled} />
				<Typography.Paragraph>Definir Lembrete</Typography.Paragraph>
			</ScheduleText>
			{isEnabled && (
				<Reminder.Root>
					<Reminder.Day values={days} onChange={onDayChange} />
					<Reminder.Hour value={hour} onChange={onHourChange} />
				</Reminder.Root>
			)}
		</>
	);
};

const CancelButton = (props: BaseButtonProps) => {
	const { onPress } = props;
	const { back } = useRouter();
	return (
		<BaseButton
			accessibilityLabel="Cancelar formulário"
			accessibilityHint="Cancela e volta para a página anterior"
			secondary
			{...props}
			onPress={(e) => {
				back();
				onPress && onPress(e);
			}}
		>
			{props.children ?? "Cancelar"}
		</BaseButton>
	);
};

const SubmitButton = (props: BaseButtonProps) => (
	<BaseButton
		accessibilityLabel="Enviar formulário"
		accessibilityHint="O formulário atual será enviado"
		{...props}
	>
		{props.children ?? "Confirmar"}
	</BaseButton>
);

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;

const Title = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
	`}
`;

const Footer = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;

const TimerText = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`;

const ScheduleText = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

export const BreathingForm = {
	Root,
	Content,
	TitleField,
	RoundsField,
	Timer,
	Schedule,
	CancelButton,
	SubmitButton,
	Footer,
};
