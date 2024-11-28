import { SettingsTemplate } from '@/ui/templates/(tabs)/settings.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <SettingsTemplate />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
