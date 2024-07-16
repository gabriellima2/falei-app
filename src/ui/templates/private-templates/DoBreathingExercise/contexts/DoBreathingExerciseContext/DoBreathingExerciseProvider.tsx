import { useEffect, useState, type PropsWithChildren } from "react";

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
	const [toggleStepCount, setToggleStepCount] = useState(0);
	const [currentRound, setCurrentRound] = useState(1);

	function handleChangeCurrentStep(step: BreathingStepNames) {
		setCurrentStep(step);
	}

	function handleIncrementCurrentRound() {
		setCurrentRound((prevState) => ++prevState);
		setToggleStepCount(0);
	}

	function handleIncrementToggleStepCount() {
		setToggleStepCount((prevState) => ++prevState);
	}

	useEffect(() => {
		if (toggleStepCount === 3) {
			handleIncrementCurrentRound();
		}
	}, [toggleStepCount]);

	return (
		<DoBreathingExerciseContext.Provider
			value={{
				exerciseId,

				currentStep,
				handleChangeCurrentStep,

				currentRound,
				handleIncrementCurrentRound,

				toggleStepCount,
				handleIncrementToggleStepCount,

				breathing,
				isLoading,
			}}
		>
			{children}
		</DoBreathingExerciseContext.Provider>
	);
};
