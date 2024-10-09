import { ActivityIndicator, View } from 'react-native'

import { BreathingIndicator } from '@/ui/components/breathing-indicator'
import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Header } from '@/ui/components/header'

import { useGetBreathingExerciseById } from '@/hooks/http/use-get-breathing-exercise-by-id'

type DoBreathingExerciseTemplateProps = {
	breathingExerciseId: string
}

export function DoBreathingExerciseTemplate(props: DoBreathingExerciseTemplateProps) {
	const { breathingExerciseId } = props
	const { breathingExercise, isLoading } = useGetBreathingExerciseById(breathingExerciseId)
	const hasBreathingExercise = !!breathingExercise
	return (
		<>
		<Header.Root spacing>
			<GoBackButton />
		</Header.Root>
			{hasBreathingExercise && (
				<BreathingIndicator
					{...breathingExercise.steps}
					iterations={breathingExercise.roundsTotal}
					onFinish={() => console.log('finish')}
				/>
			)}
			{!hasBreathingExercise && isLoading && (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			)}
		</>
	)
}
