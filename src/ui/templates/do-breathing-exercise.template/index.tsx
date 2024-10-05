import { ActivityIndicator, View } from 'react-native'

import { BreathingIndicator } from '@/ui/components/breathing-indicator'
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
			{hasBreathingExercise && <BreathingIndicator {...breathingExercise.steps} />}
			{!hasBreathingExercise && isLoading && (
				<View className='flex-1 items-center justify-center'>
					<ActivityIndicator />
				</View>
			)}
		</>
	)
}
