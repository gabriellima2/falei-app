import { useEffect, useState, type PropsWithChildren } from "react";

import { DoBreathingExerciseContext } from "./DoBreathingExerciseContext";
import { useGetBreathingExerciseById } from "@/hooks/use-get-breathing-exercise-by-id";

import { BREATHING_STATUS } from "../../constants/breathing-status";
import type { BreathingStepNames } from "@/entities/breathing-entities";

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
	const [status, setStatus] = useState<BreathingStatus>(
		BREATHING_STATUS.awaiting
	);

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

	function handleChangeStatus(newStatus: BreathingStatus) {
		setStatus(newStatus);
	}

	useEffect(() => {
		if (status !== BREATHING_STATUS.started) return;
		if (toggleStepCount === 3) {
			handleIncrementCurrentRound();
		}
	}, [toggleStepCount, status]);

	return (
		<DoBreathingExerciseContext.Provider
			value={{
				exerciseId,

				currentStep,
				handleChangeCurrentStep,

				currentRound,
				handleIncrementCurrentRound,

				status,
				handleChangeStatus,

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
