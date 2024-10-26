import { Redirect } from 'expo-router'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return <Redirect href={{ pathname: '/(auth)/sign-up' }} />
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
