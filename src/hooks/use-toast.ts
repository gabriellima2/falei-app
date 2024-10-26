import { useCallback } from 'react'
import Toast from 'react-native-toast-message'

import { colors, fontFamily } from '@/styles/theme'

type NotifyParams = {
	type: 'success' | 'error' | 'warning' | 'info'
	message: string
	description?: string
}

export function useToast() {
	const notify = useCallback((params: NotifyParams) => {
		const { type, message, description } = params
		Toast.show({
			type,
			text1: message,
			visibilityTime: 5000,
			autoHide: true,
			swipeable: true,
			position: 'top',
			text1Style: {
				color: colors.base['text-foreground'],
				fontFamily: fontFamily.heading,
				fontSize: 16,
			},
			text2: description,
			text2Style: {
				color: colors.base['text-muted'],
				fontFamily: fontFamily.body,
				fontSize: 14,
				marginTop: 2
			},
		})
	}, [])

	return { notify }
}
