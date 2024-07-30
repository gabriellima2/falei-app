import styled, { css } from "styled-components/native";

import { BreathingIndicator } from "./components/BreathingIndicator";
import { CurrentStepName } from "./components/CurrentStepName";
import { StartButton } from "./components/StartButton";
import { Round } from "./components/Round";

import { useRegisterTimer } from "./hooks/use-register-timer";

export function DoBreathingExercise() {
	useRegisterTimer();
	return (
		<>
			<Box>
				<CurrentStepName />
			</Box>
			<BreathingIndicator />
			<Box>
				<Round />
				<StartButton />
			</Box>
		</>
	);
}

const Box = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[2]};
		align-items: center;
	`}
`;
