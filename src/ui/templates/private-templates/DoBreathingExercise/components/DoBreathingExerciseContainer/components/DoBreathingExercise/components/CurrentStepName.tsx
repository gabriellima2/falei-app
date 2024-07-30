import styled, { css } from "styled-components/native";

import { Typography } from "@/ui/atoms";

import { useDoBreathingExerciseContext } from "../../../../../contexts/DoBreathingExerciseContext";
import type { BreathingStepNames } from "@/entities/breathing-entities";

const names: { [key in BreathingStepNames]: string } = {
	inhale: "Inspire",
	hold: "Segure",
	exhale: "Expire",
};

export function CurrentStepName() {
	const { currentStep } = useDoBreathingExerciseContext();
	return <ActionText>{names[currentStep]}</ActionText>;
}

const ActionText = styled(Typography.Title)`
	${({ theme }) => css`
		font-family: ${theme.fontFamily.main.regular};
	`}
`;
