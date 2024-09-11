import { Stack } from 'expo-router'
import { ProtectScreen } from '@/ui/components/protect-screen'

function Page() {
	return (
		<>
			<Stack.Screen />
		</>
	)
}

export default ProtectScreen(Page)
