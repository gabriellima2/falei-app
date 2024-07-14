import { useEffect, useState } from "react";
import { View } from "react-native";

import { Typography } from "@/ui/atoms";
import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";

export function Timer() {
	const { breathing, currentStep, handleChangeCurrentStep } =
		useDoBreathingExerciseContext();
	const [timer, setTimer] = useState(breathing!.steps.inhale);

	useEffect(() => {
		// eslint-disable-next-line prefer-const
		let interval;
		clearInterval(interval);
		if (timer === -1) {
			clearInterval(interval);
			if (currentStep === "inhale") {
				setTimer(breathing!.steps.hold);
				handleChangeCurrentStep("hold");
			}
			if (currentStep === "hold") {
				setTimer(breathing!.steps.exhale);
				handleChangeCurrentStep("exhale");
			}
			if (currentStep === "exhale") {
				setTimer(breathing!.steps.inhale);
				handleChangeCurrentStep("inhale");
			}
		}
		interval = setInterval(() => {
			setTimer((prevState) => --prevState);
		}, 1000);
		return () => clearInterval(interval);
	}, [timer]);

	return (
		<View>
			<Typography.Small>{timer}</Typography.Small>
		</View>
	);
}
