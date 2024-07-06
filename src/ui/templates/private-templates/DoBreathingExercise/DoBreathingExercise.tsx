import { useLocalSearchParams } from "expo-router";
import styled, { css } from "styled-components/native";

import { ContainerWithDefaultSpaces, Header, Typography } from "@/ui/atoms";
import { PauseButton } from "./components/PauseButton";

export function DoBreathingExercise() {
	const { id } = useLocalSearchParams<ViewRouteParams>();
	return (
		<>
			<Header withBack />
			<Container horizontalSpacing bottomSpacing>
				<Box>
					<ActionText>Inspire</ActionText>
					<Status>00:12</Status>
				</Box>
				<BreathingControlIndicator />
				<Box>
					<Status>1/3</Status>
					<PauseButton />
				</Box>
			</Container>
		</>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const ActionText = styled(Typography.Title)`
	${({ theme }) => css`
		font-family: ${theme.fontFamily.main.regular};
	`}
`;

const BreathingControlIndicator = styled.View`
	${({ theme }) => css`
		width: 180px;
		height: 180px;
		border-radius: 9999px;
		background-color: ${theme.colors.brand};
	`}
`;

const Status = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.lg};
		color: ${theme.colors.font.transparent};
	`}
`;

const Box = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[2]};
		align-items: center;
	`}
`;
