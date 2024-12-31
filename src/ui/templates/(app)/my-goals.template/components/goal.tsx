import { useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { CircleDashed, Flame, GoalIcon } from 'lucide-react-native'

import { Typography } from '@/ui/atoms/typography'

import { useNavigation } from '@/hooks/use-navigation'

import { getPercentage } from '@/helpers/general'
import { cn } from '@/helpers/cn'

import { GOAL_STATUS } from '@/constants/general'
import { ROUTES } from '@/constants/routes'

import type { GoalStatus } from '@/entities/goal.entity'

type GoalProps = {
	id: string
	title: string
	frequencyPerWeek: number
	currentWeekProgress: number
	status: GoalStatus
}

export function Goal(props: GoalProps) {
	const { id, title, frequencyPerWeek, currentWeekProgress, status } = props
		const navigation = useNavigation()

	const isCompleted = status === GOAL_STATUS.COMPLETED

	const progressPercentage = useMemo(
		() => getPercentage(currentWeekProgress, frequencyPerWeek),
		[currentWeekProgress, frequencyPerWeek],
	)

	const handleDoGoal = useCallback(() => {
		if (isCompleted) return
		navigation.push(ROUTES.APP.DO_GOAL(id))
	}, [id, navigation, isCompleted])

	return (
		<TouchableOpacity
			onPress={handleDoGoal}
			activeOpacity={0.9}
			disabled={isCompleted}
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
		</TouchableOpacity>
	)
}
