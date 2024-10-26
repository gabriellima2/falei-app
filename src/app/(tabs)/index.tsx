import { ProtectScreen } from '@/ui/components/protect-screen'
import { HomeTemplate } from '@/ui/templates/home.template'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <HomeTemplate />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
