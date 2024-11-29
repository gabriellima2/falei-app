import { useRef } from 'react'
import { View, type TextInput } from 'react-native'

import { ConfirmIdentifyBottomSheet } from '@/ui/components/bottom-sheet/confirm-identify-bottom-sheet'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Button } from '@/ui/atoms/buttons/button'
import { Field } from '@/ui/components/form/field'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

import { useUpdatePasswordViaEmail } from './hooks/use-update-password-via-email'
import { useBottomSheetControl } from '@/hooks/use-bottom-sheet-control'
import { useUpdatePasswordForm } from './hooks/use-update-password-form'
import { useAuthenticationStore } from '@/store/authentication-store'
import { useDeleteAccount } from './hooks/use-delete-account'

import { formatRemainingTime } from '@/helpers/date'

export function MyAccountTemplate() {
	const { user } = useAuthenticationStore()
	const passwordRef = useRef<TextInput>(null)
	const confirmDeleteAccountBottomSheet = useBottomSheetControl()
	const confirmUpdatePasswordBottomSheet = useBottomSheetControl()
	const {
		alreadySentFirstTime,
		isNotTimeToSendAgainOver,
		timeRemainingToSendAgain,
		isSending,
		updatePasswordViaEmail,
	} = useUpdatePasswordViaEmail()
	const { errors, control, onSubmit, updatePassword } = useUpdatePasswordForm({
		onSubmit: () => {
			passwordRef.current?.blur()
			confirmUpdatePasswordBottomSheet.handleOpen()
		},
		onSuccess: confirmUpdatePasswordBottomSheet.handleClose,
	})
	const { deleteAccount } = useDeleteAccount({
		onSuccess: confirmDeleteAccountBottomSheet.handleClose,
	})
	return (
		<Container>
			<Header.Root className="justify-start">
				<GoBackButton />
				<Header.Title className="ml-4">Minha conta</Header.Title>
			</Header.Root>
			<View className="flex-1">
				<Field.Content className="mb-4">
					<Field.Labels.Default nativeID="email">Email</Field.Labels.Default>
					<Field.Inputs.Default value={user?.email} id="email" disabled />
				</Field.Content>
				<Field.Root
					control={control}
					name="password"
					render={(params) => (
						<Field.Content>
							<Field.Labels.Default nativeID={params.nativeID}>
								Nova senha
							</Field.Labels.Default>
							<Field.Inputs.Password
								{...params}
								ref={passwordRef}
								placeholder="Digite a nova senha"
								returnKeyType="go"
								onSubmitEditing={onSubmit}
								disabled={isSending}
							/>
							<Field.Errors.Default message={errors.password?.message} />
						</Field.Content>
					)}
				/>
				<View className="items-center mt-8">
					<Button
						label="Salvar"
						onPress={onSubmit}
						disabled={isSending}
						className="mb-4"
					/>
					<Button
						label={
							!alreadySentFirstTime
								? 'Redefinir senha por email'
								: isNotTimeToSendAgainOver
									? `Não recebeu? Você poderá enviar novamente em ${formatRemainingTime(timeRemainingToSendAgain)}`
									: 'Não recebeu? Enviar novamente!'
						}
						variant="secondary"
						onPress={updatePasswordViaEmail}
						isLoading={isSending}
						disabled={isNotTimeToSendAgainOver || isSending}
						className="mb-4"
					/>
				</View>
			</View>
			<Button
				variant="destructive-text"
				label="Excluir conta"
				disabled={isSending}
				onPress={() => confirmDeleteAccountBottomSheet.handleOpen()}
			/>
			<ConfirmIdentifyBottomSheet
				ref={confirmUpdatePasswordBottomSheet.ref}
				onConfirm={updatePassword}
				onCancel={confirmUpdatePasswordBottomSheet.handleClose}
			/>
			<ConfirmIdentifyBottomSheet
				ref={confirmDeleteAccountBottomSheet.ref}
				onConfirm={deleteAccount}
				onCancel={confirmDeleteAccountBottomSheet.handleClose}
				description="Esta ação não poderá ser desfeita. Isso excluirá permanentemente o seu usuário e removerá os seus dados de nossos servidores."
			/>
		</Container>
	)
}
