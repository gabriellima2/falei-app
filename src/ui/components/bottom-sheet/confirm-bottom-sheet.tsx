import { forwardRef, type PropsWithChildren } from 'react'
import { View } from 'react-native'

import { BottomSheetScrollViewModal } from './bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/atoms/buttons/button'

import type { BottomSheetModalElementRef } from '@/@types/general'

type ConfirmBottomSheetProps = Omit<Parameters<
	typeof BottomSheetScrollViewModal
>[0], 'children'> & PropsWithChildren & {
	title?: string
	isLoading?: boolean
	onConfirm?: () => unknown
	onCancel?: () => unknown
}

export const ConfirmBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	ConfirmBottomSheetProps
>((props, ref) => {
	const { title, children, onConfirm, onCancel, disableClose, isLoading, ...rest } = props
	return (
		<BottomSheetScrollViewModal
			ref={ref}
			disableClose={disableClose || isLoading}
			{...rest}
		>
			{title ? <Typography.Title>{title}</Typography.Title> : children}
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					onPress={onCancel}
					disabled={isLoading}
					className="flex-1 mr-4"
				/>
				<Button
					label="Confirmar"
					onPress={onConfirm}
					isLoading={isLoading}
					className="flex-1"
				/>
			</View>
		</BottomSheetScrollViewModal>
	)
})
