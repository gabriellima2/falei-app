import { useCallback } from 'react'
import { FlatList, View, type ListRenderItemInfo } from 'react-native'

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

	const renderItemSeparatorComponent = useCallback(() => <View className="w-4" />, [])

	return (
		<FlatList
			data={goals}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={renderItemSeparatorComponent}
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
