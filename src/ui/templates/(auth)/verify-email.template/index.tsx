import { View } from 'react-native'
import { Redirect, type Href } from 'expo-router'
import { Mail } from 'lucide-react-native'

import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'

import { useSendEmailVerification } from './hooks/use-send-email-verification'
import { useAuthenticationStore } from '@/store/authentication-store'
import { useRefreshUser } from './hooks/use-refresh-user'

import { formatRemainingTime } from '@/helpers/date'
import { ROUTES } from '@/constants/routes'
import { colors } from '@/styles/theme'

export function VerifyEmailTemplate() {
	const { user } = useAuthenticationStore()
	const { isRefreshing, handleRefresh } = useRefreshUser()
	const { timeRemainingToSendAgain, isNotTimeToSendAgainOver, isSending, handleSend } = useSendEmailVerification()

	if (user?.emailVerified) return <Redirect href={ROUTES.TABS.HOME as Href} />

	return (
		<Container>
			<View className="flex-1 items-center justify-center">
				<View className="items-center justify-center">
					<Mail size={40} color={colors.base.primary} strokeWidth={1.3} />
					<Typography.Title className="text-center mt-4 text-xl">
						Verifique o seu e-mail para continuar!
					</Typography.Title>
				</View>
				<Typography.Paragraph className="text-center max-w-[300px] mt-2">
					Enviamos um e-mail para{' '}
					<Typography.Bold>{user?.email}</Typography.Bold>. Por favor, clique no
					link enviado para verificar a sua conta.
				</Typography.Paragraph>
			</View>
			<View className="items-center mt-8">
				<Button
					label="Já verifiquei! Quero continuar"
					disabled={isSending}
					isLoading={isRefreshing}
					onPress={handleRefresh}
					className="mb-4"
				/>
				<Button
					variant="secondary"
					label={
						isNotTimeToSendAgainOver
							? `Não recebeu? Você poderá enviar novamente em ${formatRemainingTime(timeRemainingToSendAgain)}`
							: 'Não recebeu? Enviar novamente!'
					}
					disabled={isNotTimeToSendAgainOver || isRefreshing}
					isLoading={isSending}
					onPress={handleSend}
				/>
			</View>
		</Container>
	)
}
