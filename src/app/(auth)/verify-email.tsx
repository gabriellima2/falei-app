import { ProtectScreen } from '@/ui/components/protect-screen'
import { Typography } from '@/ui/atoms/typography'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <Typography.Title>Verificar email</Typography.Title>
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
