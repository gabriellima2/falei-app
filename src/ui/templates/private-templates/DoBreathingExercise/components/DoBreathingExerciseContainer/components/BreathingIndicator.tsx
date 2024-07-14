import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";
import { theme } from "@/styles/theme";

export function BreathingIndicator() {
	const { breathing } = useDoBreathingExerciseContext();
	const scale = useRef(new Animated.Value(1)).current;

	const inhale = Animated.timing(scale, {
		toValue: 2,
		useNativeDriver: true,
		duration: breathing!.steps.inhale * 1000,
	});
	const hold = Animated.timing(scale, {
		toValue: 2,
		useNativeDriver: true,
		duration: breathing!.steps.hold * 1000,
	});
	const exhale = Animated.timing(scale, {
		toValue: 1,
		useNativeDriver: true,
		duration: breathing!.steps.exhale * 1000,
	});
	const sequence = Animated.sequence([inhale, hold, exhale]);

	useEffect(() => {
		Animated.loop(sequence, { iterations: breathing!.rounds.total }).start(
			({ finished }) => console.log(finished)
		);
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
