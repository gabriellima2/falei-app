import { Stack } from 'expo-router'

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: 'slide_from_right' }} />
		</>
	)
}
