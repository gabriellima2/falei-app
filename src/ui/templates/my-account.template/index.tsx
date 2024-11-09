import { View } from 'react-native'

import { ConfirmIdentifyBottomSheet } from '@/ui/components/bottom-sheet/confirm-identify-bottom-sheet'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Button } from '@/ui/atoms/buttons/button'
import { Field } from '@/ui/components/form/field'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

import { useUpdatePasswordForm } from './hooks/use-update-password-form'
import { useAuthenticationStore } from '@/store/authentication-store'
import { useUpdatePasswordViaEmail } from './hooks/use-update-password-via-email'
import { formatRemainingTime } from '@/helpers/date'

export function MyAccountTemplate() {
	const { user } = useAuthenticationStore()
	const {
		alreadySentFirstTime,
		isNotTimeToSendAgainOver,
		timeRemainingToSendAgain,
		isSending,
		handleUpdatePasswordViaEmail,
	} = useUpdatePasswordViaEmail()
	const {
		confirmIdentifyBottomSheet,
		errors,
		control,
		onSubmit,
		handleUpdatePassword,
	} = useUpdatePasswordForm()
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
						onPress={handleUpdatePasswordViaEmail}
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
			/>
			<ConfirmIdentifyBottomSheet
				ref={confirmIdentifyBottomSheet.ref}
				onConfirm={handleUpdatePassword}
			/>
		</Container>
	)
}
