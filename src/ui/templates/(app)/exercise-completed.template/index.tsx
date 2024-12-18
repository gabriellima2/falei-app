import { useCallback } from 'react'
import { View } from 'react-native'
import { Medal } from 'lucide-react-native'
import { Confetti } from 'react-native-fast-confetti'

import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'

import { useNavigation } from '@/hooks/use-navigation'

import { ROUTES } from '@/constants/routes'
import { colors } from '@/styles/theme'

export function ExerciseCompletedTemplate() {
	const navigation = useNavigation()

	const handleConfirm = useCallback(() => {
		navigation.replace(ROUTES.TABS.HOME)
	}, [navigation])

	return (
		<>
			<Confetti autoplay fadeOutOnEnd count={300} />
			<Container>
				<View className="flex-1 items-center justify-center">
					<View className="items-center justify-center">
						<Medal size={40} color={colors.base.primary} strokeWidth={1.3} />
						<Typography.Title className="text-center mt-4 text-xl">
							Concluído com sucesso!
						</Typography.Title>
					</View>
					<Typography.Paragraph className="text-center max-w-[300px] mt-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt.
					</Typography.Paragraph>
				</View>
				<Button label="Confirmar" onPress={handleConfirm} />
			</Container>
		</>
	)
}
