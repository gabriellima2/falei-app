import { useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { CircleDashed, Flame, GoalIcon } from 'lucide-react-native'

import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Typography } from '@/ui/atoms/typography'
import { Header } from '@/ui/components/header'
import { Radio } from '@/ui/atoms/radio'

import { useGetAllGoalsByStatus } from '@/hooks/queries/use-get-all-goals-by-status'

import { GOAL_STATUS } from '@/constants/general'
import { cn } from '@/helpers/cn'

import type { GoalStatus } from '@/@types/general'
import { isCompletedGoal } from '@/helpers/goals'

export function MyGoals() {
	const [status, setStatus] = useState<GoalStatus>(
		GOAL_STATUS.ALL,
	)
	const { goals, isFetching } = useGetAllGoalsByStatus(status)
	return (
		<FlatList
			data={goals}
			contentContainerStyle={{ paddingHorizontal: 16 }}
			ItemSeparatorComponent={() => <View className="h-4" />}
			ListHeaderComponent={() => (
				<View>
					<Header.Root className="justify-start">
						<GoBackButton />
						<Header.Title className="ml-4">Minhas metas</Header.Title>
					</Header.Root>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="mb-8"
					>
						<Radio.Group
							value={status}
							onValueChange={(type) =>
								setStatus(type as GoalStatus)
							}
						>
							<Radio.Item
								value={GOAL_STATUS.ALL}
								label="Todos"
							/>
							<Radio.Item
								value={GOAL_STATUS.PENDING}
								label="Pendentes"
							/>
							<Radio.Item
								value={GOAL_STATUS.COMPLETED}
								label="Completados"
							/>
						</Radio.Group>
					</ScrollView>
				</View>
			)}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				const percentage = Math.min(
					(item.currentWeekProgress / item.frequencyPerWeek) * 100,
					100,
				)
				const isCompleted = isCompletedGoal({
					currentWeekProgress: item.currentWeekProgress,
					frequencyPerWeek: item.frequencyPerWeek,
				})
				return (
					<View
						key={item.id}
						className={cn(
							'bg-layout-foreground p-4 rounded-xl flex-row items-center',
							{ 'bg-base-primary-foreground': isCompleted },
						)}
					>
						<View
							className={cn(
								'w-16 h-16 mr-4 rounded-full bg-common-white/5 items-center justify-center',
								{ 'bg-base-primary-foreground': isCompleted },
							)}
						>
							{isCompleted ? (
								<Flame className="text-base-primary" />
							) : (
								<CircleDashed className="text-common-white" />
							)}
						</View>
						<View className="flex-1">
							<Typography.Title className="mb-2">{item.title}</Typography.Title>
							<View className="flex-row items-center gap-1 mb-4">
								<GoalIcon size={16} className="text-common-white" />
								<Typography.Paragraph>
									{item.currentWeekProgress} de {item.frequencyPerWeek} na semana
								</Typography.Paragraph>
							</View>
							<View>
								<View className="flex-row justify-between items-center mb-2">
									<Typography.Small>Progresso</Typography.Small>
									<Typography.Subtitle>{percentage}%</Typography.Subtitle>
								</View>
								<View className="w-full bg-layout-divider h-1 rounded">
									<View
										style={{ width: `${percentage}%` }}
										className={cn('h-1 rounded bg-common-white', {
											'bg-base-primary': isCompleted,
										})}
									/>
								</View>
							</View>
						</View>
					</View>
				)
			}}
		/>
	)
}
