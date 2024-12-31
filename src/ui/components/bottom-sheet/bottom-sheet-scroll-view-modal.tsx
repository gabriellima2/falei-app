import { forwardRef, useMemo, type ReactNode } from 'react'
import { BottomSheetModal as BaseBottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet'

import { colors } from '@/styles/theme'
import type { BottomSheetModalElementRef } from '@/@types/general'

type BottomSheetScrollViewModalProps = {
	children: ReactNode
	snapPoints?: (number | string)[]
	disableClose?: boolean
	onDismiss?: () => void
}

export const BottomSheetScrollViewModal = forwardRef<
	BottomSheetModalElementRef,
	BottomSheetScrollViewModalProps
>((props, ref) => {
	const { children, disableClose = false, ...rest } = props
	const snapPoints = useMemo(() => ['50%', '75%', '90%'], [])
	return (
		<BaseBottomSheetModal
			ref={ref}
			snapPoints={snapPoints}
			detached
			enableDynamicSizing
			enablePanDownToClose={!disableClose}
			backgroundStyle={{ backgroundColor: colors.layout.foreground }}
			backdropComponent={(_props) => (
				<BottomSheetBackdrop
					{..._props}
					style={[_props.style]}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					opacity={0.5}
					pressBehavior={disableClose ? 'none' : 'close'}
				/>
			)}
			handleIndicatorStyle={{
				backgroundColor: colors.layout.divider,
				width: 52,
				height: 6,
				marginTop: 8,
			}}
			{...rest}
		>
			<BottomSheetScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
					paddingTop: 4,
				}}
			>
				{children}
			</BottomSheetScrollView>
		</BaseBottomSheetModal>
	)
})
