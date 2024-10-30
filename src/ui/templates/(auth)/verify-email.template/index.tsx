import { TouchableOpacity, View } from 'react-native'
import { Redirect, type Href } from 'expo-router'
import { MailPlus } from 'lucide-react-native'

import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useVerifyEmail } from './hooks/use-verify-email'

import { ROUTES } from '@/constants/routes'
import { colors } from '@/styles/theme'

export function VerifyEmailTemplate() {
	const { user } = useAuthenticationStore()
	const { isResending, isRefreshing, handleRefresh, handleResendEmailVerification } = useVerifyEmail()
	if (user?.emailVerified) return <Redirect href={ROUTES.TABS.HOME as Href} />
	return (
		<Container>
			<View className="flex-1 items-center justify-center">
				<View className="items-center justify-center">
					<MailPlus size={40} color={colors.base.primary} strokeWidth={1.3} />
					<Typography.Title className="text-center mt-4 text-xl">
						Por favor, verifique o seu email
					</Typography.Title>
				</View>
				<Typography.Paragraph className="text-center max-w-[300px] mt-4">
					Enviamos um email para{' '}
					<Typography.Bold>{user?.email}</Typography.Bold>. Por favor, clique no
					link enviado para verificar a sua conta.
				</Typography.Paragraph>
			</View>
			<View className="items-center mt-8">
				<Button
					label="Verifiquei"
					className="mb-4"
					disabled={isResending}
					isLoading={isRefreshing}
					onPress={handleRefresh}
				/>
				<View className="flex-row">
					<Typography.Paragraph className="mr-1">
						Não recebeu o email?
					</Typography.Paragraph>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={handleResendEmailVerification}
						disabled={isResending}
					>
						<Typography.Paragraph className="text-base-primary">
							Reenviar
						</Typography.Paragraph>
					</TouchableOpacity>
				</View>
			</View>
		</Container>
	)
}
