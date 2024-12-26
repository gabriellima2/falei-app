import { View } from 'react-native'

import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { ScrollContainer } from '@/ui/atoms/scroll-container'
import { Header } from '@/ui/components/header'

export function MyGoals() {
	return (
		<ScrollContainer>
			<Header.Root className="justify-start">
				<GoBackButton />
				<Header.Title className="ml-4">Minhas metas</Header.Title>
			</Header.Root>
			<View>
			</View>
		</ScrollContainer>
	)
}
