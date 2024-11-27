import { WelcomeTemplate } from '@/ui/templates/welcome.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <WelcomeTemplate />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
