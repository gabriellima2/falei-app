import { StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT =
	Number(StatusBar.currentHeight?.toFixed() || 56) + 16

export const CUSTOM_CODE_FOR_BREAK_LINE_CHAR = '/n'
