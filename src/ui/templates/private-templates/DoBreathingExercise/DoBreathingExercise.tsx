/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import styled, { css } from "styled-components/native";

import {
	ContainerWithDefaultSpaces,
	Header,
	LoadingIndicator,
	Typography,
} from "@/ui/atoms";
import { BreathingIndicator } from "./components/BreathingIndicator";
import { PauseButton } from "./components/PauseButton";

import { useGetBreathingExerciseById } from "@/hooks/use-get-breathing-exercise-by-id";
import type { BreathingSteps } from "@/entities/breathing-entities";

type Steps = keyof BreathingSteps;

export function DoBreathingExercise() {
	const { id } = useLocalSearchParams<ViewRouteParams>();
	const { breathing, isLoading } = useGetBreathingExerciseById(id!);
	const [step, setStep] = useState<Steps>("inhale");
	return (
		<>
			<Header withBack />
			<Container horizontalSpacing bottomSpacing>
				{isLoading && <LoadingIndicator />}
				{breathing && (
					<>
						<Box>
							<ActionText>Inspire</ActionText>
							<Status>{breathing.steps[step]}</Status>
						</Box>
						<BreathingIndicator
							steps={breathing.steps}
							rounds={breathing.rounds.total}
						/>
						<Box>
							<Status>1/{breathing.rounds.total}</Status>
							<PauseButton />
						</Box>
					</>
				)}
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
