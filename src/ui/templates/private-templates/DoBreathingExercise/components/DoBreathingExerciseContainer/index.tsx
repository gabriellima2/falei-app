import styled, { css } from "styled-components/native";

import { BreathingIndicator } from "./components/BreathingIndicator";
import { CurrentStepName } from "./components/CurrentStepName";
import { PauseButton } from "./components/PauseButton";
import { LoadingIndicator } from "@/ui/atoms";
import { Round } from "./components/Round";
import { Timer } from "./components/Timer";

import { useDoBreathingExerciseContext } from "../../contexts/DoBreathingExerciseContext";

export function DoBreathingExerciseContainer() {
	const { breathing, isLoading } = useDoBreathingExerciseContext();
	return (
		<>
			{isLoading && <LoadingIndicator />}
			{breathing && (
				<>
					<Box>
						<CurrentStepName />
						<Timer />
					</Box>
					<BreathingIndicator />
					<Box>
						<Round />
						<PauseButton />
					</Box>
				</>
			)}
		</>
	);
}

const Box = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[2]};
		align-items: center;
	`}
`;
