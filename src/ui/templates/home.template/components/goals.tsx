import { useCallback } from 'react'
import { FlatList, type ListRenderItemInfo } from 'react-native'

import { Goal } from '@/ui/components/goal'
import { useGetAllGoals } from '@/hooks/http/use-get-all-goals'

import type { GoalEntity } from '@/entities/goal.entity'

export function Goals() {
	const { goals } = useGetAllGoals()

	const keyExtractor = useCallback((item: GoalEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<GoalEntity>) => (
			<Goal
				id={item.id}
				title={item.title}
				steps={item.steps}
				roundsTotal={item.roundsTotal}
				activityHistory={item.activityHistory}
				frequencyPerWeek={item.frequencyPerWeek}
			/>
		),
		[],
	)

	return (
		<FlatList
			data={goals}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	)
}
