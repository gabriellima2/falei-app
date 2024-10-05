import { useCallback, useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

import { getWindowDimensions } from '@/helpers/general'
import { colors } from '@/styles/theme'

const { width } = getWindowDimensions()
const circleSize = width / 2

const layers = [0, 1, 2, 3, 4, 5, 6, 7]

export function BreathingIndicator() {
	const move = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(move, {
					toValue: 1,
					duration: 4000,
					useNativeDriver: true,
				}),
				Animated.timing(move, {
					toValue: 0,
					duration: 4000,
					useNativeDriver: true,
				}),
			]),
		)
		animation.start()
		return () => animation.stop()
	}, [move])


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
