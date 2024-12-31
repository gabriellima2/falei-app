import 'react-native-gesture-handler'
import 'react-native-reanimated'
import '@/config/firebase'

import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react'
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
} from '@expo-google-fonts/roboto'

import { Providers } from '@/providers'

import { useAuthenticationStore } from '@/store/authentication-store'
import { STATUS_BAR_HEIGHT } from '@/constants/general'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const { authHasBeenChecked, checkAuthState } = useAuthenticationStore()
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded && authHasBeenChecked) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded, authHasBeenChecked])

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const unsubscribe = checkAuthState()
		return () => unsubscribe()
	}, [])

	if (!fontsLoaded || !authHasBeenChecked) return null

	return (
		<>
			<GestureHandlerRootView className="flex-1">
				<StatusBar style="light" />
				<Providers>
					<SafeAreaView
						className="flex-1 bg-layout-background"
						style={{ paddingTop: STATUS_BAR_HEIGHT }}
						onLayout={onLayoutRootView}
					>
						<Stack
							screenOptions={{
								headerShown: false,
								contentStyle: { backgroundColor: '#111212' },
							}}
						>
							<Stack.Screen name="index" />
						</Stack>
					</SafeAreaView>
				</Providers>
			</GestureHandlerRootView>
			<Toast />
		</>
	)
}
