import { GoalsContainer } from './components/goals-container'
import { GoalsProvider } from './contexts/goals.context'

export function Goals() {
	return (
		<GoalsProvider>
			<GoalsContainer />
		</GoalsProvider>
	)
}
