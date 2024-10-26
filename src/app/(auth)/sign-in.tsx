import { Stack } from 'expo-router'
import { SignInTemplate } from '@/ui/templates/(auth)/sign-in.template'

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<SignInTemplate />
		</>
	)
}
