import 'react-native-gesture-handler'
import '@/config/firebase'

import { SafeAreaView, View } from 'react-native'
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
} from '@expo-google-fonts/roboto'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

import { LoadingIndicator } from '@/ui/atoms/loading-indicator'
import { Providers } from '@/ui/providers'

import { useAuthenticationStore } from '@/store/authentication-store'

export default function RootLayout() {
	const { authHasBeenChecked } = useAuthenticationStore()
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
	})
	return (
		<>
			<StatusBar style="light" />
			{!fontsLoaded && !authHasBeenChecked ? (
				<LoadingIndicator />
			) : (
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Providers>
						<SafeAreaView>
							<View>
								<Stack
									screenOptions={{
										headerShown: false,
										animation: 'fade',
										contentStyle: { backgroundColor: '#ffffff' },
									}}
								/>
							</View>
						</SafeAreaView>
					</Providers>
				</GestureHandlerRootView>
			)}
		</>
	)
}
