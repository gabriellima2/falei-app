import { StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT =
	Number(StatusBar.currentHeight?.toFixed() || 56) + 16
