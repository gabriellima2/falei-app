import { Stack } from 'expo-router'

import { ForgotPasswordTemplate } from '@/ui/templates/(auth)/forgot-password.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return (
		<>
			<Stack.Screen />
			<ForgotPasswordTemplate />
		</>
	)
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
