import { Flower } from "lucide-react-native";
import styled, { css } from "styled-components/native";

import { Menu } from "./components";
import { ExerciseInformation } from "../../ExerciseInformation";
import { AdditionalExerciseInfo, Typography } from "@/ui/atoms";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import { dimensions } from "@/constants/dimensions";
import { formatTime } from "@/helpers/format-time";
import { isTablet } from "@/constants/is-tablet";
import { margin } from "@/constants/margin";
import { theme } from "@/styles/theme";

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
	const dayAbbr = DAYS_OF_THE_WEEK[scheduledAt.days[0]].slice(0, 3);
	const date = `${dayAbbr} - ${formatTime(
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
				<HeaderLeft>
					<Icon>
						<Flower color={theme.colors.main} size={24} />
					</Icon>
					<Title>{title}</Title>
				</HeaderLeft>
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

const defaultContainerMaxWidth = 400;
const renderItemsTotal =
	dimensions.window.width > defaultContainerMaxWidth * 2 ? 2 : 1;

const modifiers: Modifiers<keyof Pick<ContainerProps, "autoSize">> = {
	autoSize: () => css`
		max-width: ${isTablet ? `${defaultContainerMaxWidth}px` : "auto"};
		width: ${dimensions.window.withMargin.width}px;
	`,
};

const Icon = styled.View`
	${({ theme }) => css`
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: ${theme.rounded.regular};
		background-color: ${theme.colors.main}1a;
	`}
`;

const HeaderLeft = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[4]};
	`}
`;

const Container = styled.TouchableOpacity<ContainerProps>`
	${({ theme, autoSize, color = theme.colors.brand }) => css`
		width: ${(dimensions.window.withMargin.width -
			margin.vertical.total * renderItemsTotal) /
		renderItemsTotal}px;
		min-width: 300px;
		padding: ${theme.spaces[4]} ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[5]};
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
	top: -40%;
`;

const Description = styled.View`
	${({ theme }) => css`
		flex: 1;
		gap: ${theme.spaces[1]};
	`}
`;
