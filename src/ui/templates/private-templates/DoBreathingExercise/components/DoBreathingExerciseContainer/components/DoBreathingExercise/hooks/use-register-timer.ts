import { useEffect, useState } from "react";

import { useDoBreathingExerciseContext } from "@/ui/templates/private-templates/DoBreathingExercise/contexts/DoBreathingExerciseContext";

import { BREATHING_STATUS } from "@/ui/templates/private-templates/DoBreathingExercise/constants/breathing-status";
import { ONE_SECOND_IN_MS } from "@/constants/utils";

export function useRegisterTimer() {
	const {
		status,
		breathing,
		currentStep,
		currentRound,
		handleChangeStatus,
		handleChangeCurrentStep,
		handleIncrementToggleStepCount,
	} = useDoBreathingExerciseContext();
	const [timer, setTimer] = useState(breathing!.steps.inhale);

	function handleToggleCurrentStep() {
		if (currentRound === breathing!.rounds.total) {
			handleChangeStatus(BREATHING_STATUS.finished);
			setTimer(0);
			return;
		}
		if (currentStep === "inhale") {
			setTimer(breathing!.steps.hold);
			handleChangeCurrentStep("hold");
			handleIncrementToggleStepCount();
		}
		if (currentStep === "hold") {
			setTimer(breathing!.steps.exhale);
			handleChangeCurrentStep("exhale");
			handleIncrementToggleStepCount();
		}
		if (currentStep === "exhale") {
			setTimer(breathing!.steps.inhale);
			handleChangeCurrentStep("inhale");
			handleIncrementToggleStepCount();
		}
	}

	useEffect(() => {
		// eslint-disable-next-line prefer-const
		let interval;
		clearInterval(interval);
		if (status !== BREATHING_STATUS.started) return;
		const isFinished = timer <= 0;
		if (isFinished) {
			handleToggleCurrentStep();
		}
		interval = setInterval(() => {
			setTimer((prevState) => --prevState);
		}, ONE_SECOND_IN_MS);
		return () => clearInterval(interval);
	}, [timer, status]);
}
