import { NotebookText } from 'lucide-react-native'

import { BaseExercise } from './base-exercise'
import { removeCustomBreakLinesAndWhiteSpaces } from '@/helpers/general'

type TongueTwisterProps = {
	id: string
	body: string
	onPress?: (id: string) => void
}

export function TongueTwister(props: TongueTwisterProps) {
	const { id, body, onPress } = props

	function handlePress() {
		if (onPress) {
			onPress(id)
		}
	}

	return (
		<BaseExercise.Root variant="tongue-twister" onPress={handlePress}>
			<BaseExercise.Header>
				<BaseExercise.Icon
					renderIcon={(props) => <NotebookText {...props} />}
				/>
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Paragraph>
					{removeCustomBreakLinesAndWhiteSpaces(body)}
				</BaseExercise.Paragraph>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
