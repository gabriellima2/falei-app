import { forwardRef } from 'react'

import { BottomSheetScrollViewModal } from '../../../bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'

import type { BottomSheetModalElementRef } from '@/@types/general'

export const CreateBreathingExerciseBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	object
>((_, ref) => {
	return (
		<BottomSheetScrollViewModal ref={ref}>
			<Typography.Title>
				Respiração
			</Typography.Title>
		</BottomSheetScrollViewModal>
	)
})
