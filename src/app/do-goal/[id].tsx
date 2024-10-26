import { useLocalSearchParams } from 'expo-router'
import { DoGoalTemplate } from '@/ui/templates/do-goal.template'

export default function Page() {
	const { id } = useLocalSearchParams()
	return <DoGoalTemplate goalId={id as string} />
}
