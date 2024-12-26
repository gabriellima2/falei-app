import { MyGoals } from '@/ui/templates/(app)/my-goals.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <MyGoals />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
