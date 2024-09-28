import { View } from 'react-native'

import { BreathingExercises } from './components/breathing-exercises'
import { TonguesTwister } from './components/tongues-twister'
import { ScrollContainer } from '@/ui/atoms/scroll-container'
import { Section } from '@/ui/components/section'
import { Header } from '@/ui/components/header'
import { Poem } from '@/ui/components/poem'
import { Goals } from './components/goals'

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
					<Poem
						id="1"
						body="No meio do caminho tinha uma pedra tinha uma pedra no meio do caminho tinha uma pedra no meio do caminho tinha uma pedra."
					/>
				</Section>
			</View>
		</ScrollContainer>
	)
}
