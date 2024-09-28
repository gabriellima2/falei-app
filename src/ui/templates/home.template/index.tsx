import { View } from 'react-native'

import { BreathingExercises } from './components/breathing-exercises'
import { TonguesTwister } from './components/tongues-twister'
import { ScrollContainer } from '@/ui/atoms/scroll-container'
import { Section } from '@/ui/components/section'
import { Header } from '@/ui/components/header'
import { Goals } from './components/goals'
import { Poems } from './components/poems'

export function HomeTemplate() {
	return (
		<ScrollContainer>
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
			<View>
				<Section title="Metas">
					<Goals />
				</Section>
				<Section title="Exercícios de respiração">
					<BreathingExercises />
				</Section>
				<Section title="Trava-línguas">
					<TonguesTwister />
				</Section>
				<Section title="Poemas">
					<Poems />
				</Section>
			</View>
		</ScrollContainer>
	)
}
