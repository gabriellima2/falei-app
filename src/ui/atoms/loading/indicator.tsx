import { ActivityIndicator } from 'react-native'
import { colors } from '@/styles/theme'

type IndicatorProps = {
	color?: string
	size?: number
}

export function Indicator(props: IndicatorProps) {
	const { color = colors.base.primary, size = 20 } = props
	return <ActivityIndicator color={color} size={size} />
}
