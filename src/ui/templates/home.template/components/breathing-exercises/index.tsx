import { BreathingExercisesContainer } from './components/breathing-exercises-container'
import { BreathingExercisesProvider } from './contexts/breathing-exercises.context'

export function BreathingExercises() {
	return (
		<BreathingExercisesProvider>
			<BreathingExercisesContainer />
		</BreathingExercisesProvider>
	)
}
