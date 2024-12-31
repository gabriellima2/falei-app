import { forwardRef } from 'react'
import { View } from 'react-native'

import { Typography } from '@/ui/atoms/typography'

import type { BottomSheetModalElementRef } from '@/@types/general'
import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'

export const CreateExerciseBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	object
>((_, ref) => {
	return (
		<BottomSheetScrollViewModal
			ref={ref}
		>
			<Typography.Title>Qual tipo de exercício você deseja criar?</Typography.Title>
			<View className="flex-row mt-8">
			</View>
		</BottomSheetScrollViewModal>
	)
})
