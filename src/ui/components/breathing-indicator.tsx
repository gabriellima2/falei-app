import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'

import { Typography } from '../atoms/typography'

import { BREATHING_STEPS_TEXT } from '@/constants/general'
import { getWindowDimensions } from '@/helpers/general'
import { colors } from '@/styles/theme'

const { width } = getWindowDimensions()
const circleSize = width / 2

const layers = [0, 1, 2, 3, 4, 5, 6, 7]

type BreathingIndicatorProps = {
	inhale: number
	hold: number
	exhale: number
	iterations: number
	onFinish?: () => unknown
}

export function BreathingIndicator(props: BreathingIndicatorProps) {
	const { inhale, hold, exhale, iterations, onFinish } = props
	const [stepText, setStepText] = useState(BREATHING_STEPS_TEXT.INHALE)
	const move = useRef(new Animated.Value(0)).current

	const handleStepTextChange = useCallback((step: number) => {
		if (step === 0) {
			setStepText(BREATHING_STEPS_TEXT.INHALE)
			return
		}
		if (step === 1) {
			setStepText(BREATHING_STEPS_TEXT.EXHALE)
			return
		}
		if (step === 2) {
			setStepText(BREATHING_STEPS_TEXT.HOLD)
			return
		}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const listener = move.addListener(({ value }) => handleStepTextChange(value))
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(move, {
					toValue: 2,
					duration: inhale,
					easing: Easing.in(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(move, {
					toValue: 1,
					duration: hold,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(move, {
					toValue: 0,
					duration: exhale,
					easing: Easing.in(Easing.ease),
					useNativeDriver: true,
				}),
			]),
			{ iterations },
		)
		animation.start(({ finished }) => {
			if (finished && onFinish) {
				onFinish()
			}
		})
		return () => {
			animation.stop()
			move.removeListener(listener)
		}
	}, [])

	const translate = move.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [0, circleSize / 6, circleSize / 6],
	})

	const getRotation = useCallback(
		(layer: number) => {
			return move.interpolate({
				inputRange: [0, 1, 2],
				outputRange: [
					`${layer * 45}deg`,
					`${layer * 45 + 180}deg`,
					`${layer * 45 + 180}deg`,
				],
			})
		},
		[move],
	)

	return (
		<View className="flex-1 items-center justify-around">
			<View className="mt-4">
				<Typography.Title>{stepText}</Typography.Title>
			</View>
			<View className="flex-1 items-center justify-center">
				{layers.map((layer) => (
					<Animated.View
						key={layer}
						style={{
							opacity: 0.1,
							backgroundColor: colors.base.primary,
							width: circleSize,
							height: circleSize,
							borderRadius: circleSize / 2,
							position: 'absolute',
							transform: [
								{ rotateZ: getRotation(layer) },
								{ translateX: translate },
								{ translateY: translate },
							],
						}}
					/>
				))}
			</View>
		</View>
	)
}
