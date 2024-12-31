import { PoemsContainer } from './components/poems-container'
import { PoemsProvider } from './contexts/poems.context'

export function Poems() {
	return (
		<PoemsProvider>
			<PoemsContainer />
		</PoemsProvider>
	)
}
