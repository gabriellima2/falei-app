import styled, { css } from "styled-components/native";

import { AdditionalExerciseInfo } from "@/components/Exercises";
import { BreathingExerciseAppointmentMenu } from "./components";
import { Typography } from "@/components/commons";

import type { BreathingExerciseAppointmentEntity } from "@/entities";

export type BreathingExerciseAppointmentProps = Omit<
	BreathingExerciseAppointmentEntity,
	"id" | "exercise_id" | "user_id" | "last_progress_at"
> & {
	onPress?: () => void | Promise<void>;
};

export const BreathingExerciseAppointment = (
	props: BreathingExerciseAppointmentProps
) => {
	const { title, rounds, scheduled_at, onPress } = props;
	return (
		<Container
			testID="breathing-exercise-appointment"
			accessibilityLabel="Fazer exercício"
			accessibilityHint="Navegará para a tela de realização do exercício"
			activeOpacity={0.8}
			onPress={onPress}
			accessibilityRole="link"
		>
			<Header>
				<Title>{title}</Title>
				<BreathingExerciseAppointmentMenu />
			</Header>
			<Content>
				<Description>
					<AdditionalExerciseInfo hasDarkColors>
						{scheduled_at.days[0]} - {scheduled_at.hour}
					</AdditionalExerciseInfo>
					<AdditionalExerciseInfo hasDarkColors>
						{rounds.rounds_total} Rounds
					</AdditionalExerciseInfo>
					<AdditionalExerciseInfo hasDarkColors>
						{rounds.duration_per_round_in_min} Min.
					</AdditionalExerciseInfo>
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
		width: 100%;
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
		font-size: ${theme.fontSizes.regular};
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
