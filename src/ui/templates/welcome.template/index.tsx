import { Image, View } from 'react-native'

import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'
import { Links } from '@/ui/atoms/links'

import { ROUTES } from '@/constants/routes'

export function WelcomeTemplate() {
	return (
		<Container className="justify-between">
			<View className="items-center flex-1 justify-center">
				<Image
					resizeMode="contain"
					source={require('../../../../public/images/welcome.png')}
					style={{ aspectRatio: 1 }}
					className="w-full max-w-sm"
				/>
			</View>
			<View>
				<Typography.Title className="text-4xl mb-8">
					Seu companheiro para uma comunicação mais fácil e sem preocupações
				</Typography.Title>
				<Links.Default href={ROUTES.AUTH.SIGN_UP} asChild>
					<Button label="Começar" />
				</Links.Default>
			</View>
		</Container>
	)
}
