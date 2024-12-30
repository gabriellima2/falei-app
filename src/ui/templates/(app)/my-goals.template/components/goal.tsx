import { useMemo } from 'react'
import { View } from 'react-native'
import { CircleDashed, Flame, GoalIcon } from 'lucide-react-native'

import { Typography } from '@/ui/atoms/typography'

import { isCompletedGoal } from '@/helpers/goals'
import { cn } from '@/helpers/cn'

type GoalProps = {
	id: string
	title: string
	frequencyPerWeek: number
	currentWeekProgress: number
}

export function Goal(props: GoalProps) {
	const { title, frequencyPerWeek, currentWeekProgress } = props

	const progressPercentage = useMemo(
		() => Math.min((currentWeekProgress / frequencyPerWeek) * 100, 100),
		[currentWeekProgress, frequencyPerWeek],
	)
	const isCompleted = useMemo(
		() => isCompletedGoal({ currentWeekProgress, frequencyPerWeek }),
		[currentWeekProgress, frequencyPerWeek],
	)

	return (
		<View
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
				<Typography.Title className="mb-2">{title}</Typography.Title>
				<View className="flex-row items-center gap-1 mb-4">
					<GoalIcon size={16} className="text-common-white" />
					<Typography.Paragraph>
						{currentWeekProgress} de {frequencyPerWeek} na semana
					</Typography.Paragraph>
				</View>
				<View>
					<View className="flex-row justify-between items-center mb-2">
						<Typography.Small>Progresso</Typography.Small>
						<Typography.Subtitle>{progressPercentage}%</Typography.Subtitle>
					</View>
					<View className="w-full bg-layout-divider h-1 rounded">
						<View
							style={{ width: `${progressPercentage}%` }}
							className={cn('h-1 rounded bg-common-white', {
								'bg-base-primary': isCompleted,
							})}
						/>
					</View>
				</View>
			</View>
		</View>
	)
}
