import { Stack } from 'expo-router'

import { VerifyEmailTemplate } from '@/ui/templates/(auth)/verify-email.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return (
		<>
			<Stack.Screen />
			<VerifyEmailTemplate />
		</>
	)
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PRIVATE })
