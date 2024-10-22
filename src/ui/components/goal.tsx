import { useMemo } from 'react'
import { Flame } from 'lucide-react-native'

import { formatDurationTime } from '@/helpers/date'
import { BaseExercise } from './base-exercise'

type GoalProps = {
	id: string
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequencyPerWeek: number
	currentWeekProgress: number
	onPress?: (id: string) => void
	onMenuPress?: (id: string) => void
}

export function Goal(props: GoalProps) {
	const {
		id,
		title,
		roundsTotal,
		steps,
		frequencyPerWeek,
		currentWeekProgress,
		onPress,
		onMenuPress,
	} = props

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
			variant="goal"
			onPress={handlePress}
			onMenuPress={handleMenuPress}
		>
			<BaseExercise.Header>
				<BaseExercise.Icon renderIcon={(_props) => <Flame {..._props} />} />
				<BaseExercise.Menu />
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Title>{title}</BaseExercise.Title>
				<BaseExercise.InformationRoot>
					<BaseExercise.InformationItem
						text={`${currentWeekProgress} de ${frequencyPerWeek}`}
					/>
					<BaseExercise.InformationItem text={`${roundsTotal}x`} />
					<BaseExercise.InformationItem text={durationTime} />
				</BaseExercise.InformationRoot>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}
