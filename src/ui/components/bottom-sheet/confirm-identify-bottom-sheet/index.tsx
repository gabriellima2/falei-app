import { forwardRef, type PropsWithChildren } from 'react'
import { View } from 'react-native'

import { BottomSheetScrollViewModal } from '../bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/atoms/buttons/button'
import { Field } from '../../form/field'

import { useConfirmIdentifyForm } from './hooks/use-confirm-identify-form'

import type { BottomSheetModalElementRef } from '@/@types/general'

type ConfirmIdentifyBottomSheetProps = Omit<
	Parameters<typeof BottomSheetScrollViewModal>[0],
	'children'
> &
	PropsWithChildren & {
		title?: string
		onConfirm?: () => unknown
		onCancel?: () => unknown
	}

export const ConfirmIdentifyBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	ConfirmIdentifyBottomSheetProps
>((props, ref) => {
	const {
		title = 'Confirme a sua identidade para continuar',
		children,
		onConfirm,
		onCancel,
		disableClose,
		...rest
	} = props
	const { errors, control, isSubmitting, onSubmit } = useConfirmIdentifyForm({ onConfirm })
	return (
		<BottomSheetScrollViewModal
			ref={ref}
			disableClose={disableClose || isSubmitting}
			{...rest}
		>
			{title ? <Typography.Title>{title}</Typography.Title> : children}
			<Field.Root
				control={control}
				name="password"
				render={(params) => (
					<Field.Content className="mt-8">
						<Field.Labels.Default nativeID={params.nativeID}>
							Senha atual
						</Field.Labels.Default>
						<Field.Inputs.Password
							{...params}
							placeholder="Digite a sua senha atual"
							returnKeyType="go"
							onSubmitEditing={onSubmit}
							className="border border-white/10"
						/>
						<Field.Errors.Default message={errors.password?.message} />
					</Field.Content>
				)}
			/>
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					onPress={onCancel}
					disabled={isSubmitting}
					className="flex-1 mr-4"
				/>
				<Button
					label="Confirmar"
					onPress={onConfirm}
					isLoading={isSubmitting}
					className="flex-1"
				/>
			</View>
		</BottomSheetScrollViewModal>
	)
})
