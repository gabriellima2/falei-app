import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

function Page() {
	return (
		<Container className="p-0">
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
		</Container>
	)
}

export default Page // ProtectScreen(Page)
