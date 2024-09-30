import { NotebookText } from 'lucide-react-native'
import { BaseExercise } from './base-exercise'

type TongueTwisterProps = {
	id: string
	body: string
}

export function TongueTwister(props: TongueTwisterProps) {
	const { body } = props
	return (
		<BaseExercise.Root variant="poem" onMenuPress={console.log}>
			<BaseExercise.Header>
				<BaseExercise.Icon
					renderIcon={(props) => <NotebookText {...props} />}
				/>
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Paragraph>{body}</BaseExercise.Paragraph>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
