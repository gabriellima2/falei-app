import { useCallback } from 'react'
import type { ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { Typography } from '@/ui/atoms/typography'
import { Goal } from '@/ui/components/goal'

import { useGetAllGoals } from '@/hooks/http/use-get-all-goals'

import type { GoalEntity } from '@/entities/goal.entity'

export function Goals() {
	const { goals, isLoading, isFetching } = useGetAllGoals()

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
		<HorizontalList
			data={goals}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<Typography.Label>Loading...</Typography.Label>
					) : (
						<Typography.Label>Empty...</Typography.Label>
					)}
				</>
			)}
		/>
	)
}
