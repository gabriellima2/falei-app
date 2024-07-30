import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { useDoBreathingExerciseContext } from "../../../../../contexts/DoBreathingExerciseContext";

import { BREATHING_STATUS } from "../../../../../constants/breathing-status";
import { ONE_SECOND_IN_MS } from "@/constants/utils";

import { theme } from "@/styles/theme";

const ANIMATION_DURATION = ONE_SECOND_IN_MS;

export function BreathingIndicator() {
	const { breathing, status, handleChangeStatus } =
		useDoBreathingExerciseContext();
	const scale = useRef(new Animated.Value(1)).current;

	const inhale = Animated.timing(scale, {
		toValue: 2,
		useNativeDriver: true,
		duration: breathing!.steps.inhale * ANIMATION_DURATION,
	});
	const hold = Animated.timing(scale, {
		toValue: 2,
		useNativeDriver: true,
		duration: breathing!.steps.hold * ANIMATION_DURATION,
	});
	const exhale = Animated.timing(scale, {
		toValue: 1,
		useNativeDriver: true,
		duration: breathing!.steps.exhale * ANIMATION_DURATION,
	});
	const sequence = Animated.sequence([inhale, hold, exhale]);

	useEffect(() => {
		if (status !== BREATHING_STATUS.started) return;
		Animated.loop(sequence, { iterations: breathing!.rounds.total }).start(
			({ finished }) => {
				if (!finished) return;
				handleChangeStatus(BREATHING_STATUS.finished);
			}
		);
	}, [scale, status]);

	return (
		<Animated.View style={[styles.container, { transform: [{ scale }] }]} />
	);
}

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 140,
		borderRadius: 9999,
		backgroundColor: theme.colors.brand,
	},
});
