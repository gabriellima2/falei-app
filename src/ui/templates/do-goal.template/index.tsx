import { useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { BreathingIndicator } from '@/ui/components/breathing-indicator'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Header } from '@/ui/components/header'

import { useSaveGoalProgress } from './hooks/use-save-goal-progress'
import { useGetGoalById } from '@/hooks/http/use-get-goal-by-id'

type DoGoalTemplateProps = {
	goalId: string
}

export function DoGoalTemplate(props: DoGoalTemplateProps) {
	const { goalId } = props
	const { isPendingSaveGoalProgress, handleSaveGoalProgress } = useSaveGoalProgress(goalId)
	const { goal, isLoading } = useGetGoalById(goalId)
	const hasGoal = !!goal

	return (
		<>
			<Header.Root spacing>
				<GoBackButton />
			</Header.Root>
			{hasGoal && !isPendingSaveGoalProgress && (
				<BreathingIndicator
					{...goal.steps}
					iterations={goal.roundsTotal}
					onFinish={handleSaveGoalProgress}
				/>
			)}
			{isPendingSaveGoalProgress || (!hasGoal && isLoading) && (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			)}
		</>
	)
}
