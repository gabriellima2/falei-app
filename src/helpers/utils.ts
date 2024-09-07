import type { MutableRefObject } from 'react'
import type { TextInput } from 'react-native'

import { dimensions } from '@/constants/dimensions'

export function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1)
}

export function focusNextField(fieldRef: MutableRefObject<null | TextInput>) {
	if (!fieldRef.current) return
	fieldRef.current.focus()
}

export function hasAppointmentToday(
	days: number[],
	dayToCampare = new Date().getDay()
) {
	return days.some((day) => day === dayToCampare)
}

export const isTablet = () => dimensions.window.width > 768
