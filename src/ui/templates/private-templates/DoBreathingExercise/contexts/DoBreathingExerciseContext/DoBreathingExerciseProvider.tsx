import { useState, type PropsWithChildren } from "react";

import { DoBreathingExerciseContext } from "./DoBreathingExerciseContext";
import { useGetBreathingExerciseById } from "@/hooks/use-get-breathing-exercise-by-id";
import { BreathingStepNames } from "@/entities/breathing-entities";

type DoBreathingExerciseProviderProps = PropsWithChildren & {
	exerciseId: string;
};

export const DoBreathingExerciseProvider = (
	props: DoBreathingExerciseProviderProps
) => {
	const { exerciseId, children } = props;
	const { breathing, isLoading } = useGetBreathingExerciseById(exerciseId);
	const [currentStep, setCurrentStep] = useState<BreathingStepNames>("inhale");
	const [currentRound, setCurrentRound] = useState(1);

	function handleChangeCurrentStep(step: BreathingStepNames) {
		setCurrentStep(step);
	}

	function handleChangeCurrentRound(round: number) {
		setCurrentRound(round);
	}

	return (
		<DoBreathingExerciseContext.Provider
			value={{
				exerciseId,

				currentStep,
				handleChangeCurrentStep,

				currentRound,
				handleChangeCurrentRound,

				breathing,
				isLoading,
			}}
		>
			{children}
		</DoBreathingExerciseContext.Provider>
	);
};
