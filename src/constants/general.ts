import { Dimensions, StatusBar } from 'react-native'
import type { GoalStatus } from '@/@types/general'

export const STATUS_BAR_HEIGHT =
	Number(StatusBar.currentHeight?.toFixed() || 56) + 16

export const CUSTOM_CODE_FOR_BREAK_LINE = '/n'
export const CUSTOM_CODE_FOR_WHITE_SPACE = '/w'

export const BREATHING_STEPS_TEXT = {
	INHALE: 'Inspirar',
	HOLD: 'Segurar',
	EXHALE: 'Expirar'
}

export const SCREEN_WIDTH = Dimensions.get('screen').width

export const GOAL_STATUS: Record<
	'ALL' | 'PENDING' | 'COMPLETED',
	GoalStatus
> = {
	ALL: 'all',
	PENDING: 'pending',
	COMPLETED: 'completed',
}
