import { Stack } from 'expo-router'
import { SignUpTemplate } from '@/ui/templates/(auth)/sign-up.template'

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<SignUpTemplate />
		</>
	)
}
