import { useLocalSearchParams } from 'expo-router'

import { DoGoalTemplate } from '@/ui/templates/(app)/do-goal.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	const { id } = useLocalSearchParams()
	return <DoGoalTemplate goalId={id as string} />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
