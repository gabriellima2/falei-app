import { Dimensions, StatusBar } from 'react-native'

import type { FilterByGoalStatus } from '@/@types/general'
import type { GoalStatus } from '@/entities/goal.entity'

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

export const GOAL_STATUS: Record<'PENDING' | 'COMPLETED', GoalStatus> = {
	PENDING: 'pending',
	COMPLETED: 'completed',
}

export const FILTER_BY_GOAL_STATUS: Record<
	'ALL' | 'PENDING' | 'COMPLETED',
	FilterByGoalStatus
> = { ...GOAL_STATUS, ALL: 'all' }
