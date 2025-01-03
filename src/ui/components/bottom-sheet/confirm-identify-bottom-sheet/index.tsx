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
	'children' | 'onDismiss'
> &
	PropsWithChildren & {
		title?: string
		description?: string
		isLoading?: boolean
		onConfirm?: () => unknown
		onCancel?: () => unknown
	}

export const ConfirmIdentifyBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	ConfirmIdentifyBottomSheetProps
>((props, ref) => {
	const {
		title = 'Confirme a sua identidade para continuar',
		description,
		children,
		onConfirm,
		onCancel,
		disableClose,
		...rest
	} = props
	const { errors, control, isSubmitting, clearAll, onSubmit } = useConfirmIdentifyForm({ onConfirm })

	async function handleCancel() {
		onCancel && (await onCancel())
		clearAll()
	}

	return (
		<BottomSheetScrollViewModal
			ref={ref}
			disableClose={disableClose || isSubmitting}
			onDismiss={clearAll}
			{...rest}
		>
			{title ? <Typography.Title>{title}</Typography.Title> : null}
			{description ? <Typography.Paragraph className='mt-1'>{description}</Typography.Paragraph> : null}
			{children || null}
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
							autoFocus
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
					onPress={handleCancel}
					disabled={isSubmitting}
					className="flex-1 mr-4"
				/>
				<Button
					label="Confirmar"
					onPress={onSubmit}
					isLoading={isSubmitting}
					className="flex-1"
				/>
			</View>
		</BottomSheetScrollViewModal>
	)
})
