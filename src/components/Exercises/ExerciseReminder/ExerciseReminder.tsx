import Ionicons from "@expo/vector-icons/Ionicons";
import styled, { css } from "styled-components/native";

import { AdditionalExerciseInfo } from "../AdditionalExerciseInfo";
import { Typography } from "@/components/commons";

export type ExerciseReminderProps = {
	title: string;
	scheduledAt: { day: string; hour: string };
	rounds: number;
	durationTime: number;
	isOnTheScheduledDate?: boolean;
	onPress?: () => void | Promise<void>;
};

export const ExerciseReminder = (props: ExerciseReminderProps) => {
	const {
		title,
		scheduledAt,
		rounds,
		durationTime,
		isOnTheScheduledDate,
		onPress,
	} = props;

	return (
		<Container
			testID="exercise-reminder"
			accessibilityLabel={
				isOnTheScheduledDate ? "Fazer exercício" : "Próximo lembrete"
			}
			accessibilityHint={
				isOnTheScheduledDate
					? "Navegará para a tela de realização do exercício"
					: undefined
			}
			activeOpacity={isOnTheScheduledDate ? 0.8 : 1}
			onPress={() => (isOnTheScheduledDate && onPress ? onPress() : undefined)}
		>
			<Header>
				<Title subtitle>{title}</Title>
				<Ionicons name="ellipsis-vertical" size={20} />
			</Header>
			<Description>
				<OtherInfo>
					{scheduledAt.day} - {scheduledAt.hour}h
				</OtherInfo>
				<OtherInfo>{rounds} Rounds</OtherInfo>
				<OtherInfo>{durationTime} Min.</OtherInfo>
			</Description>
		</Container>
	);
};

const Container = styled.TouchableOpacity`
	${({ theme }) => css`
		padding: ${theme.spaces[4]} ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[4]};
		background-color: ${theme.colors.brand};
	`}
`;

const Title = styled(Typography.Title)`
	${({ theme }) => css`
		color: ${theme.colors.main};
	`}
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Description = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[1]};
	`}
`;

const OtherInfo = styled(AdditionalExerciseInfo)`
	${({ theme }) => css`
		color: ${theme.colors.main};
	`}
`;
