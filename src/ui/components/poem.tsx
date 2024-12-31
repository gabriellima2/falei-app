import { BookOpenText } from 'lucide-react-native'

import { BaseExercise } from './base-exercise'
import { removeCustomBreakLinesAndWhiteSpaces } from '@/helpers/general'

type PoemProps = {
	id: string
	body: string
	onPress?: (id: string) => void
}

export function Poem(props: PoemProps) {
	const { id, body, onPress } = props

	function handlePress() {
		if (onPress) {
			onPress(id)
		}
	}

	return (
		<BaseExercise.Root variant="poem" onPress={handlePress}>
			<BaseExercise.Header>
				<BaseExercise.Icon
					renderIcon={(props) => <BookOpenText {...props} />}
				/>
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Paragraph>{removeCustomBreakLinesAndWhiteSpaces(body)}</BaseExercise.Paragraph>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
