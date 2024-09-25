import { BookOpenText } from 'lucide-react-native'
import { BaseExercise } from './base-exercise'

type PoemProps = {
	id: string
	body: string
}

export function Poem(props: PoemProps) {
	const { body } = props
	return (
		<BaseExercise.Root variant="poem" onMenuPress={console.log}>
			<BaseExercise.Header>
				<BaseExercise.Icon
					renderIcon={(props) => <BookOpenText {...props} />}
				/>
			</BaseExercise.Header>
			<BaseExercise.Content className="min-h-[114px]">
				<BaseExercise.Paragraph>{body}</BaseExercise.Paragraph>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
