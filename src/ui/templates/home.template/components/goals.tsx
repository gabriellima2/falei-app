import { useCallback } from 'react'
import { ActivityIndicator, type ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Goal } from '@/ui/components/goal'

import { useGetAllGoals } from '@/hooks/http/use-get-all-goals'
import { useNavigation } from '@/hooks/use-navigation'

import { ROUTES } from '@/constants/routes'
import type { GoalEntity } from '@/entities/goal.entity'

export function Goals() {
	const navigation = useNavigation()
	const { goals, isLoading, isFetching } = useGetAllGoals()

	const handleDoGoal = useCallback(
		(id: string) => {
			navigation.push(ROUTES.DO_GOAL(id))
		},
		[navigation],
	)

	const keyExtractor = useCallback((item: GoalEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<GoalEntity>) => (
			<Goal
				id={item.id}
				title={item.title}
				steps={item.steps}
				roundsTotal={item.roundsTotal}
				currentWeekProgress={item.currentWeekProgress}
				frequencyPerWeek={item.frequencyPerWeek}
				onPress={handleDoGoal}
			/>
		),
		[handleDoGoal],
	)

	return (
		<HorizontalList
			data={goals}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<ActivityIndicator />
					) : (
						<EmptyMessage />
					)}
				</>
			)}
		/>
	)
}
