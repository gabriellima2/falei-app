import 'react-native-gesture-handler'
import 'react-native-reanimated'
import '@/config/firebase'

import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ToastManager from 'toastify-react-native'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
} from '@expo-google-fonts/roboto'

import { Providers } from '@/providers'

import { useAuthenticationStore } from '@/store/authentication-store'
import { STATUS_BAR_HEIGHT } from '@/constants/general'
import { colors } from '@/styles/theme'

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
	const { authHasBeenChecked } = useAuthenticationStore()
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
	})

	if (!fontsLoaded && !authHasBeenChecked) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<GestureHandlerRootView className="flex-1">
			<StatusBar style="light" />
			<Providers>
				<ToastManager
					duration={5000}
					hasBackdrop
					position="top"
					showCloseIcon={false}
					textStyle={{
						color: colors.base.text,
						fontSize: 16,
					}}
					height={60}
					style={{ backgroundColor: colors.layout.foreground }}
				/>
				<SafeAreaView
					className="flex-1 bg-layout-background"
					style={{ paddingTop: STATUS_BAR_HEIGHT }}
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
	)
}
