import { useLocalSearchParams } from 'expo-router'

import { DoBreathingExerciseTemplate } from '@/ui/templates/do-breathing-exercise.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	const { id } = useLocalSearchParams()
	return <DoBreathingExerciseTemplate breathingExerciseId={id as string} />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
