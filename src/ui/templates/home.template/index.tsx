import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

export function HomeTemplate() {
	return (
		<Container className="p-0">
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
		</Container>
	)
}
