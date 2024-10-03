import { useMemo } from 'react'
import { NotebookText } from 'lucide-react-native'

import { BaseExercise } from './base-exercise'
import { getSentencesWithBreakLine, removeLastDot } from '@/helpers/general'

type TongueTwisterProps = {
	id: string
	body: string
	onPress?: (id: string) => void
}

export function TongueTwister(props: TongueTwisterProps) {
	const { id, body, onPress } = props

	const firstSentence = useMemo(() => {
		if (!body) return ''
		const sentences = getSentencesWithBreakLine(body)
		return sentences.length > 0 ? `${removeLastDot(sentences[0])}...` : ''
	}, [body])

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
				<BaseExercise.Paragraph>{firstSentence}</BaseExercise.Paragraph>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
