import { Container } from '../container'
import { Indicator } from './indicator'

export function FullScreen() {
	return (
		<Container className="bg-layout-background justify-center items-center">
			<Indicator size={24} />
		</Container>
	)
}
