import { useCallback, useRef } from 'react'
import type { BottomSheetModalElementRef } from '@/@types/general'

export function useBottomSheetControl() {
	const ref = useRef<BottomSheetModalElementRef>(null)

	const handleOpen = useCallback(() => {
		ref.current?.present()
	}, [])

	const handleClose = useCallback(() => {
		ref.current?.close()
	}, [])

	return {
		ref,
		handleOpen,
		handleClose,
	}
}
