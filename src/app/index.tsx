import { Image, View } from 'react-native'

import { ProtectScreen } from '@/ui/components/protect-screen'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'
import { Links } from '@/ui/atoms/links'

import { SCREEN_ROLES } from '@/constants/keys'
import { ROUTES } from '@/constants/routes'

function Page() {
	return (
		<Container className="justify-between">
			<View className="items-center flex-1 justify-center">
				<Image
					resizeMode="contain"
					source={{
						uri: 'https://raw.githubusercontent.com/gabriellima2/falei-app/refs/heads/main/public/assets/onboarding/img1.png',
					}}
					style={{ aspectRatio: 1 }}
					className="w-full max-w-sm"
				/>
			</View>
			<View>
				<Typography.Title className="text-4xl mb-8">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit
				</Typography.Title>
				<Links.Default href={ROUTES.AUTH.SIGN_UP} asChild>
					<Button label="Avançar" />
				</Links.Default>
			</View>
		</Container>
	)
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
