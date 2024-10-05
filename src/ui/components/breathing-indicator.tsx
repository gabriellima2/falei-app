import { useCallback, useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

import { getWindowDimensions } from '@/helpers/general'
import { colors } from '@/styles/theme'

const { width } = getWindowDimensions()
const circleSize = width / 2

const layers = [0, 1, 2, 3, 4, 5, 6, 7]

type BreathingIndicatorProps = {
	inhale: number
	hold: number
	exhale: number
}

export function BreathingIndicator(props: BreathingIndicatorProps) {
	const { inhale, hold, exhale } = props
	const move = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(move, {
					toValue: 1,
					duration: inhale,
					useNativeDriver: true,
				}),
				Animated.timing(move, {
					toValue: 0,
					duration: exhale,
					delay: hold,
					useNativeDriver: true,
				}),
			]),
		)
		animation.start()
		return () => animation.stop()
	}, [move, inhale, hold, exhale])


	const translate = move.interpolate({
		inputRange: [0, 1],
		outputRange: [0, circleSize / 6]
	})

	const getRotation = useCallback(
		(layer: number) => {
			return move.interpolate({
				inputRange: [0, 1],
				outputRange: [`${layer * 45}deg`, `${layer * 45 + 180}deg`],
			})
		},
		[move]
	)

	return (
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
	)
}
