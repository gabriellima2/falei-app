import { MyAccountTemplate } from '@/ui/templates/my-account.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <MyAccountTemplate />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
