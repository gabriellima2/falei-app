import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";

import { ONE_SECOND_IN_MS } from "@/constants/utils";
import { theme } from "@/styles/theme";

const ANIMATION_DELAY = 200;
const ANIMATION_DURATION = ONE_SECOND_IN_MS + ANIMATION_DELAY;

export function BreathingIndicator() {
	const { breathing } = useDoBreathingExerciseContext();
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
		Animated.loop(sequence, { iterations: breathing!.rounds.total }).start();
	}, [scale]);

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
