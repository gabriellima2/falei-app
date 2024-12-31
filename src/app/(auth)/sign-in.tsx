import { Stack } from 'expo-router'

import { SignInTemplate } from '@/ui/templates/(auth)/sign-in.template'
import { ProtectScreen } from '@/ui/components/protect-screen'

import { SCREEN_ROLES } from '@/constants/keys'

function Page() {
	return (
		<>
			<Stack.Screen />
			<SignInTemplate />
		</>
	)
}

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
