import { ActivityIndicator, View } from 'react-native'

import { BreathingIndicator } from '@/ui/components/breathing-indicator'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Header } from '@/ui/components/header'

import { useSaveGoalProgress } from './hooks/use-save-goal-progress'
import { useGetGoalById } from '@/hooks/queries/use-get-goal-by-id'
import { useNavigation } from '@/hooks/use-navigation'
import { useToast } from '@/hooks/use-toast'

import { ROUTES } from '@/constants/routes'

type DoGoalTemplateProps = {
	goalId: string
}

export function DoGoalTemplate(props: DoGoalTemplateProps) {
	const { goalId } = props
	const { isPendingSaveGoalProgress, handleSaveGoalProgress } = useSaveGoalProgress(goalId)
	const { goal, isLoading } = useGetGoalById(goalId)
	const navigation = useNavigation()
	const toast = useToast()
	const hasGoal = !!goal

	if (hasGoal && goal.currentWeekProgress === goal.frequencyPerWeek) {
		toast.notify({ type: 'error', message: 'Você já completou a frequência semanal dessa meta.' })
		navigation.replace(ROUTES.HOME)
		return null
	}

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
			{((!hasGoal && isLoading) || isPendingSaveGoalProgress) && (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			)}
		</>
	)
}
