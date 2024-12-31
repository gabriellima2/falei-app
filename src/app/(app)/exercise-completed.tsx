import { ExerciseCompletedTemplate } from '@/ui/templates/(app)/exercise-completed.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <ExerciseCompletedTemplate />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
