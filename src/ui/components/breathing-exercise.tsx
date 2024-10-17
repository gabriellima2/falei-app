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
	onPress?: (id: string) => void
	onMenuPress?: (id: string) => void
}

export function BreathingExercise(props: BreathingExerciseProps) {
	const { id, title, roundsTotal, steps, onPress, onMenuPress } = props

	const durationTime = useMemo(() => {
		const totalStepsDuration = steps.exhale + steps.hold + steps.inhale
		const _durationTime = totalStepsDuration * roundsTotal
		return formatDurationTime(_durationTime)
	}, [steps, roundsTotal])

	function handlePress() {
		if (onPress) {
			onPress(id)
		}
	}

	function handleMenuPress() {
		if (onMenuPress) {
			onMenuPress(id)
		}
	}

	return (
		<BaseExercise.Root
			variant="breathing-exercise"
			onPress={handlePress}
			onMenuPress={handleMenuPress}
		>
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
