import { Stack } from 'expo-router'

import { SignUpTemplate } from '@/ui/templates/(auth)/sign-up.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return (
		<>
			<Stack.Screen />
			<SignUpTemplate />
		</>
	)
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
