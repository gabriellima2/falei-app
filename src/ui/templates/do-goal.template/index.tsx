import { useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { BreathingIndicator } from '@/ui/components/breathing-indicator'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Header } from '@/ui/components/header'

import { useGetGoalById } from '@/hooks/http/use-get-goal-by-id'

type DoGoalTemplateProps = {
	goalId: string
}

export function DoGoalTemplate(props: DoGoalTemplateProps) {
	const { goalId } = props
	const { goal, isLoading } = useGetGoalById(goalId)
	const hasGoal = !!goal

	const handleExerciseFinish = useCallback(() => {
		console.log('Finish')
	}, [])

	return (
		<>
			<Header.Root spacing>
				<GoBackButton />
			</Header.Root>
			{hasGoal && (
				<BreathingIndicator
					{...goal.steps}
					iterations={goal.roundsTotal}
					onFinish={handleExerciseFinish}
				/>
			)}
			{!hasGoal && isLoading && (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			)}
		</>
	)
}
