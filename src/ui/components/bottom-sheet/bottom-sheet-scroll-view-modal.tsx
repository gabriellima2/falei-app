import { forwardRef, useMemo, type ReactNode } from 'react'
import { BottomSheetModal as BaseBottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'

import { Overlay } from '@/ui/atoms/overlay'

import { colors } from '@/styles/theme'
import type { BottomSheetModalElementRef } from '@/@types/general'

type BottomSheetScrollViewModalProps = {
	children: ReactNode
	snapPoints?: (number | string)[]
}

export const BottomSheetScrollViewModal = forwardRef<
	BottomSheetModalElementRef,
	BottomSheetScrollViewModalProps
>((props, ref) => {
	const snapPoints = useMemo(() => ['50%', '75%'], [])
	return (
		<BaseBottomSheetModal
			ref={ref}
			snapPoints={snapPoints}
			detached
			enableDynamicSizing
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: colors.layout.foreground }}
			backdropComponent={(props) => <Overlay {...props} />}
			handleIndicatorStyle={{
				backgroundColor: colors.layout.divider,
				width: 52,
				height: 6,
				marginTop: 8,
			}}
			{...props}
		>
			<BottomSheetScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
					paddingTop: 4,
				}}
			>
				{props.children}
			</BottomSheetScrollView>
		</BaseBottomSheetModal>
	)
})
