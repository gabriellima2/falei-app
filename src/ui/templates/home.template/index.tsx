import { BreathingExercise } from '@/ui/components/breathing-exercise'
import { PoemExercise } from '@/ui/components/poem-exercise'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

export function HomeTemplate() {
	return (
		<Container className="p-0">
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
			<BreathingExercise
				id="1"
				title="Respiração lenta"
				roundsTotal={3}
				steps={{ exhale: 3000, hold: 4000, inhale: 5000 }}
			/>
			<PoemExercise
				id="1"
				body="No meio do caminho tinha uma pedra tinha uma pedra no meio do caminho tinha uma pedra no meio do caminho tinha uma pedra."
			/>
		</Container>
	)
}
