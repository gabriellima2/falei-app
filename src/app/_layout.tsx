import 'react-native-gesture-handler'
import 'react-native-reanimated'
import '@/config/firebase'

import { ActivityIndicator, SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
} from '@expo-google-fonts/roboto'

import { useAuthenticationStore } from '@/store/authentication-store'

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
	const { authHasBeenChecked } = useAuthenticationStore()
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
	})
	return (
		<>
			<StatusBar style="light" />
			{!fontsLoaded || !authHasBeenChecked ? (
				<ActivityIndicator />
			) : (
				<GestureHandlerRootView style={{ flex: 1 }}>
					<SafeAreaView>
						<Stack>
							<Stack.Screen name="index" />
						</Stack>
					</SafeAreaView>
				</GestureHandlerRootView>
			)}
		</>
	)
}
