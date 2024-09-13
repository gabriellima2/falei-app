import 'react-native-reanimated'
import { Stack } from 'expo-router'

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" />
		</Stack>
	)
}
