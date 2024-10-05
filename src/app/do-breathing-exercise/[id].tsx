import { useLocalSearchParams } from 'expo-router'
import { DoBreathingExerciseTemplate } from '@/ui/templates/do-breathing-exercise.template'

function Page() {
	const { id } = useLocalSearchParams()
	return <DoBreathingExerciseTemplate breathingExerciseId={id as string} />
}

export default Page
