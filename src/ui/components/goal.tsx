import { useMemo } from 'react'
import { Flame } from 'lucide-react-native'
import { isThisWeek } from 'date-fns'

import { formatDurationTime } from '@/helpers/date'
import { BaseExercise } from './base-exercise'

import type { ActivityHistoryEntity } from '@/entities/activity-history.entity'

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
	activityHistory: ActivityHistoryEntity[]
}

export function Goal(props: GoalProps) {
	const { title, roundsTotal, steps, frequencyPerWeek, activityHistory } = props

	const durationTime = useMemo(() => {
		const _durationTotal = steps.exhale + steps.hold + steps.inhale
		return formatDurationTime(_durationTotal)
	}, [steps])

	const amountOfExercisesCompletedThisWeek = useMemo(() => {
		const exercisesCompletedThisWeek = activityHistory.filter((activity) =>
			isThisWeek(activity.createdAt),
		)
		return exercisesCompletedThisWeek.length
	}, [activityHistory])

	return (
		<BaseExercise.Root variant="goal" onMenuPress={console.log}>
			<BaseExercise.Header>
				<BaseExercise.Icon renderIcon={(_props) => <Flame {..._props} />} />
				<BaseExercise.Menu />
			</BaseExercise.Header>
			<BaseExercise.Content>
				<BaseExercise.Title>{title}</BaseExercise.Title>
				<BaseExercise.InformationRoot>
					<BaseExercise.InformationItem
						text={`${amountOfExercisesCompletedThisWeek} de ${frequencyPerWeek}`}
					/>
					<BaseExercise.InformationItem text={`${roundsTotal}x`} />
					<BaseExercise.InformationItem text={durationTime} />
				</BaseExercise.InformationRoot>
			</BaseExercise.Content>
		</BaseExercise.Root>
	)
}