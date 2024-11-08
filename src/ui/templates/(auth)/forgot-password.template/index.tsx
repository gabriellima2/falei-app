import { View } from 'react-native'

import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Field } from '@/ui/components/form/field'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'
import { Links } from '@/ui/atoms/links'

import { useForgotPasswordForm } from './hooks/use-forgot-password-form'

import { formatRemainingTime } from '@/helpers/date'
import { ROUTES } from '@/constants/routes'

export function ForgotPasswordTemplate() {
	const {
		errors,
		control,
		isSubmitting,
		onSubmit,
		alreadySentFirstTime,
		timeRemainingToSendAgain,
		isNotTimeToSendAgainOver,
	} = useForgotPasswordForm()
	return (
		<Container>
			<Header.Root>
				<GoBackButton />
			</Header.Root>
			<View>
				<Typography.Title className="text-left text-xl">
					Enviar email de redefinição
				</Typography.Title>
				<Typography.Paragraph className="text-left mt-2">
					Digite o email associado à sua conta para que você possa redefinir a
					sua senha.
				</Typography.Paragraph>
			</View>
			<Field.Root
				control={control}
				name="email"
				render={(params) => (
					<Field.Content className="mt-8">
						<Field.Labels.Default nativeID={params.nativeID}>
							Email
						</Field.Labels.Default>
						<Field.Inputs.Default
							{...params}
							placeholder="Digite o seu email"
							keyboardType="email-address"
							returnKeyType="next"
							onSubmitEditing={onSubmit}
						/>
						<Field.Errors.Default message={errors.email?.message} />
					</Field.Content>
				)}
			/>
			<View className="items-center mt-8">
				<Button
					label={
						!alreadySentFirstTime
							? 'Enviar'
							: isNotTimeToSendAgainOver
								? `Não recebeu? Você poderá enviar novamente em ${formatRemainingTime(timeRemainingToSendAgain)}`
								: 'Não recebeu? Enviar novamente!'
					}
					isLoading={isSubmitting}
					disabled={isNotTimeToSendAgainOver}
					onPress={onSubmit}
					className="mb-4"
				/>
				<Links.Default asChild href={ROUTES.AUTH.SIGN_IN}>
					<Button
						variant="secondary"
						label="Redefini! Quero entrar"
						disabled={!alreadySentFirstTime}
					/>
				</Links.Default>
			</View>
		</Container>
	)
}
