import { useEffect, useState } from "react";
import { View } from "react-native";

import { Typography } from "@/ui/atoms";
import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";

import { ONE_SECOND_IN_MS } from "@/constants/utils";

export function Timer() {
	const {
		breathing,
		currentStep,
		currentRound,
		handleChangeCurrentStep,
		handleIncrementToggleStepCount,
	} = useDoBreathingExerciseContext();
	const [timer, setTimer] = useState(breathing!.steps.inhale);

	function handleToggleCurrentStep() {
		if (currentRound === breathing!.rounds.total) return;
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
		const isFinished = timer === -1;
		if (isFinished) {
			handleToggleCurrentStep();
		}
		interval = setInterval(() => {
			setTimer((prevState) => --prevState);
		}, ONE_SECOND_IN_MS);
		return () => clearInterval(interval);
	}, [timer]);

	return (
		<View>
			<Typography.Small>{timer}</Typography.Small>
		</View>
	);
}
