import styled, { css } from "styled-components/native";

import { Menu } from "./components";
import { ExerciseInformation } from "../../ExerciseInformation";
import { AdditionalExerciseInfo, Typography } from "@/ui/atoms";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import { dimensions } from "@/constants/dimensions";
import { formatTime } from "@/helpers/format-time";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";
import type { Modifiers } from "@/@types/modifiers";

export type BreathingAppointmentProps = Omit<
	BreathingAppointmentEntity,
	"id" | "exerciseID" | "userID" | "lastProgressAt" | "category"
> &
	ContainerProps & {
		onPress?: () => void | Promise<void>;
	};

export const BreathingAppointment = (props: BreathingAppointmentProps) => {
	const { title, rounds, scheduledAt, autoSize, color, onPress } = props;
	const date = `${DAYS_OF_THE_WEEK[scheduledAt.days[0]]} - ${formatTime(
		scheduledAt.hour,
		scheduledAt.minutes
	)}`;
	return (
		<Container
			testID="breathing-exercise-appointment"
			accessibilityLabel="Fazer exercício"
			accessibilityHint="Navegará para a tela de realização do exercício"
			activeOpacity={0.8}
			onPress={onPress}
			accessibilityRole="link"
			autoSize={autoSize}
			color={color}
		>
			<Header>
				<Title>{title}</Title>
				<Menu />
			</Header>
			<Content>
				<Description>
					<AdditionalExerciseInfo hasDarkColors>{date}</AdditionalExerciseInfo>
					<ExerciseInformation
						hasDarkColors
						rounds={{
							total: rounds.total,
							completed: rounds.completed,
							duration: rounds.durationPerRoundInSec,
						}}
					/>
				</Description>
				<CharacterImage
					source={require("../../../../../public/assets/exercise-bg.png")}
					resizeMode="contain"
				/>
			</Content>
		</Container>
	);
};

type ContainerProps = { autoSize?: boolean; color?: string };

const { withMargin } = dimensions.screen;
const modifiers: Modifiers<keyof Pick<ContainerProps, "autoSize">> = {
	autoSize: () => css`
		max-width: auto;
		width: ${withMargin.width}px;
		min-width: auto;
	`,
};

const Container = styled.TouchableOpacity<ContainerProps>`
	${({ theme, autoSize, color = theme.colors.brand }) => css`
		max-width: 350px;
		width: 328px;
		padding: ${theme.spaces[4]} ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[4]};
		background-color: ${color};
		position: relative;
		overflow: hidden;
		${autoSize && modifiers.autoSize(theme)};
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
