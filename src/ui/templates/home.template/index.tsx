import { Flame } from 'lucide-react-native'

import { BaseExercise } from '@/ui/components/base-exercise'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

export function HomeTemplate() {
	return (
		<Container className="p-0">
			<Header.Root>
				<Header.Title>Início</Header.Title>
			</Header.Root>
			<BaseExercise.Root variant="default" onMenuPress={console.log}>
				<BaseExercise.Header>
					<BaseExercise.Icon renderIcon={(props) => <Flame {...props} />} />
					<BaseExercise.Menu />
				</BaseExercise.Header>
				<BaseExercise.Content>
					<BaseExercise.Title>Respiração lenta</BaseExercise.Title>
					<BaseExercise.InformationRoot>
						<BaseExercise.InformationItem text="4 Rounds" />
						<BaseExercise.InformationItem text="18 min." />
					</BaseExercise.InformationRoot>
				</BaseExercise.Content>
			</BaseExercise.Root>

			<BaseExercise.Root variant="breathing-exercise" onMenuPress={console.log}>
				<BaseExercise.Header>
					<BaseExercise.Icon renderIcon={(props) => <Flame {...props} />} />
					<BaseExercise.Menu />
				</BaseExercise.Header>
				<BaseExercise.Content>
					<BaseExercise.Title>Respiração lenta</BaseExercise.Title>
					<BaseExercise.InformationRoot>
						<BaseExercise.InformationItem text="4 Rounds" />
						<BaseExercise.InformationItem text="18 min." />
					</BaseExercise.InformationRoot>
				</BaseExercise.Content>
			</BaseExercise.Root>

			<BaseExercise.Root variant="goal" onMenuPress={console.log}>
				<BaseExercise.Header>
					<BaseExercise.Icon renderIcon={(props) => <Flame {...props} />} />
					<BaseExercise.Menu />
				</BaseExercise.Header>
				<BaseExercise.Content>
					<BaseExercise.Title>Respiração lenta</BaseExercise.Title>
					<BaseExercise.InformationRoot>
						<BaseExercise.InformationItem text="4 Rounds" />
						<BaseExercise.InformationItem text="18 min." />
					</BaseExercise.InformationRoot>
				</BaseExercise.Content>
			</BaseExercise.Root>

			<BaseExercise.Root variant="poem" onMenuPress={console.log}>
				<BaseExercise.Header>
					<BaseExercise.Icon renderIcon={(props) => <Flame {...props} />} />
					<BaseExercise.Menu />
				</BaseExercise.Header>
				<BaseExercise.Content>
					<BaseExercise.Title>Respiração lenta</BaseExercise.Title>
					<BaseExercise.InformationRoot>
						<BaseExercise.InformationItem text="4 Rounds" />
						<BaseExercise.InformationItem text="18 min." />
					</BaseExercise.InformationRoot>
				</BaseExercise.Content>
			</BaseExercise.Root>

			<BaseExercise.Root variant="tongue-twister" onMenuPress={console.log}>
				<BaseExercise.Header>
					<BaseExercise.Icon renderIcon={(props) => <Flame {...props} />} />
					<BaseExercise.Menu />
				</BaseExercise.Header>
				<BaseExercise.Content>
					<BaseExercise.Title>Respiração lenta</BaseExercise.Title>
					<BaseExercise.InformationRoot>
						<BaseExercise.InformationItem text="4 Rounds" />
						<BaseExercise.InformationItem text="18 min." />
					</BaseExercise.InformationRoot>
				</BaseExercise.Content>
			</BaseExercise.Root>
		</Container>
	)
}
