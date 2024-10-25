import { SignUpTemplate } from '@/ui/templates/(auth)/sign-up.template'
import { Stack } from 'expo-router'

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<SignUpTemplate />
		</>
	)
}
