import { TonguesTwisterContainer } from './components/tongues-twister-container'
import { TonguesTwisterProvider } from './contexts/tongues-twister.context'

export function TonguesTwister() {
	return (
		<TonguesTwisterProvider>
			<TonguesTwisterContainer />
		</TonguesTwisterProvider>
	)
}
