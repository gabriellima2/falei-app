import { useMemo } from 'react'
import { Shell } from 'lucide-react-native'

import { BaseExercise } from './base-exercise'
import { formatDurationTime } from '@/helpers/date'

type BreathingExerciseProps = {
	id: string
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
}

export function BreathingExercise(props: BreathingExerciseProps) {
	const { title, roundsTotal, steps } = props

	const durationTime = useMemo(() => {
		const _durationTotal = steps.exhale + steps.hold + steps.inhale
		return formatDurationTime(_durationTotal)
	}, [steps])

	return (
		<BaseExercise.Root variant="breathing-exercise" onMenuPress={console.log}>
			<BaseExercise.Header>
				<BaseExercise.Icon renderIcon={(_props) => <Shell {..._props} />} />
				<BaseExercise.Menu />
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Title>{title}</BaseExercise.Title>
				<BaseExercise.InformationRoot>
					<BaseExercise.InformationItem text={`${roundsTotal}x`} />
					<BaseExercise.InformationItem text={durationTime} />
				</BaseExercise.InformationRoot>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
