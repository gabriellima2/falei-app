import { useCallback, useRef } from 'react'
import type { TextInput } from 'react-native'

export function useFocusNextField() {
	const fieldRef = useRef<TextInput>(null)

	const handleFocus = useCallback(() => {
		fieldRef.current?.focus()
	}, [])

	return {
		fieldRef,
		handleFocus
	}
}
