import styled, { css } from "styled-components/native";

import { AdditionalExerciseInfo } from "../AdditionalExerciseInfo";
import { ExerciseReminderMenu } from "./components";
import { Typography } from "@/components/commons";

export type ExerciseReminderProps = {
	title: string;
	scheduledAt: string;
	repetitions: number;
	durationInMin: number;
	isOnScheduledDate?: boolean;
	onPress?: () => void | Promise<void>;
};

export const ExerciseReminder = (props: ExerciseReminderProps) => {
	const {
		title,
		scheduledAt,
		repetitions,
		durationInMin,
		isOnScheduledDate,
		onPress,
	} = props;

	const labelText = isOnScheduledDate ? "Fazer exercício" : "Próximo lembrete";
	const hintText = isOnScheduledDate
		? "Navegará para a tela de realização do exercício"
		: undefined;
	const activeOpacity = isOnScheduledDate ? 0.8 : 1;
	const handlePress = () =>
		isOnScheduledDate && onPress ? onPress() : undefined;

	return (
		<Container
			testID="exercise-reminder"
			accessibilityLabel={labelText}
			accessibilityHint={hintText}
			activeOpacity={activeOpacity}
			onPress={handlePress}
		>
			<Header>
				<Title subtitle>{title}</Title>
				<ExerciseReminderMenu />
			</Header>
			<Content>
				<Description>
					<OtherInfo>{scheduledAt}</OtherInfo>
					<OtherInfo>{repetitions} Rounds</OtherInfo>
					<OtherInfo>{durationInMin} Min.</OtherInfo>
				</Description>
				<CharacterImage
					source={require("../../../../public/assets/exercise-bg.png")}
					resizeMode="contain"
				/>
			</Content>
		</Container>
	);
};

const Container = styled.TouchableOpacity`
	${({ theme }) => css`
		padding: ${theme.spaces[4]} ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[4]};
		background-color: ${theme.colors.brand};
		position: relative;
		overflow: hidden;
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
	z-index: 100;
`;

const Content = styled.View`
	flex-direction: row;
`;

const CharacterImage = styled.Image`
	height: 188px;
	position: absolute;
	right: -60px;
	top: -40px;
`;

const Description = styled.View`
	${({ theme }) => css`
		flex: 1;
		gap: ${theme.spaces[1]};
	`}
`;

const OtherInfo = styled(AdditionalExerciseInfo)`
	${({ theme }) => css`
		color: ${theme.colors.main};
	`}
`;
