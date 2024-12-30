import React from 'react'
import { useCallback, useState } from 'react'
import { View, type ListRenderItemInfo } from 'react-native'

import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { FilterByStatus } from './components/filter-by-status'
import { VerticalList } from '@/ui/components/vertical-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Header } from '@/ui/components/header'
import { Skeleton } from '@/ui/atoms/skeleton'
import { Goal } from './components/goal'

import { useGetAllGoalsByStatus } from '@/hooks/queries/use-get-all-goals-by-status'

import { GOAL_STATUS } from '@/constants/general'

import type { GoalEntity } from '@/entities/goal.entity'
import type { GoalStatus } from '@/@types/general'

export function MyGoals() {
	const [status, setStatus] = useState<GoalStatus>(
		GOAL_STATUS.ALL,
	)
	const { goals, isLoading, isFetching } = useGetAllGoalsByStatus(status)

	const renderHeader = useCallback(
		() => (
			<View>
				<Header.Root className="justify-start">
					<GoBackButton />
					<Header.Title className="ml-4">Minhas metas</Header.Title>
				</Header.Root>
				<FilterByStatus status={status} onStatusChange={setStatus} />
			</View>
		),
		[status],
	)

	const keyExtractor = useCallback((item: GoalEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<GoalEntity>) => (
			<Goal
				id={item.id}
				title={item.title}
				currentWeekProgress={item.currentWeekProgress}
				frequencyPerWeek={item.frequencyPerWeek}
			/>
		),
		[],
	)

	return (
		<VerticalList
			data={goals}
			ListHeaderComponent={renderHeader}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<Skeleton.ExerciseVerticalList />
					) : (
						<EmptyMessage />
					)}
				</>
			)}
		/>
	)
}
