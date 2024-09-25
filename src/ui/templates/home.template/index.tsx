import { ScrollView, View } from 'react-native'

import { BreathingExercise } from '@/ui/components/breathing-exercise'
import { TongueTwister } from '@/ui/components/tongue-twister'
import { Section } from '@/ui/components/section'
import { ScrollContainer } from '@/ui/atoms/scroll-container'
import { Header } from '@/ui/components/header'
import { Poem } from '@/ui/components/poem'
import { Goal } from '@/ui/components/goal'
import { addDays } from 'date-fns'

export function HomeTemplate() {
	return (
		<ScrollContainer>
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
			<View>
				<Section title="Metas">
					<Goal
						id="1"
						title="Respiração lenta"
						roundsTotal={4}
						steps={{ exhale: 3000, hold: 4000, inhale: 5000 }}
						frequencyPerWeek={3}
						activityHistory={[
							{ createdAt: new Date().toISOString() },
							{ createdAt: addDays(new Date(), -1).toISOString() },
							{ createdAt: addDays(new Date(), -5).toISOString() },
						]}
					/>
				</Section>
				<Section title="Exercícios de respiração">
					<BreathingExercise
						id="1"
						title="Respiração lenta"
						roundsTotal={4}
						steps={{ exhale: 3000, hold: 4000, inhale: 5000 }}
					/>
				</Section>
				<Section title="Trava-línguas">
					<TongueTwister
						id="1"
						body="Trazei três pratos de trigo para três tigres tristes comerem."
					/>
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
