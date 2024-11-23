import { useCallback } from 'react'
import { ActivityIndicator, type ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Goal } from '@/ui/components/goal'

import { useGetAllPendingGoals } from '@/hooks/queries/use-get-all-pending-goals'
import { useNavigation } from '@/hooks/use-navigation'

import { ROUTES } from '@/constants/routes'
import type { GoalEntity } from '@/entities/goal.entity'
import { useGoalsContext } from '../contexts/goals.context/hooks'

export function GoalsContainer() {
	const navigation = useNavigation()
	const { handleOpenGoalMenu } = useGoalsContext()
	const { goals, isLoading, isFetching } = useGetAllPendingGoals()

	const handleDoGoal = useCallback(
		(id: string) => {
			navigation.push(ROUTES.APP.DO_GOAL(id))
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
				onMenuPress={handleOpenGoalMenu}
			/>
		),
		[handleDoGoal, handleOpenGoalMenu],
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
						<EmptyMessage text="Você não tem metas pendentes para essa semana 🥳" />
					)}
				</>
			)}
		/>
	)
}