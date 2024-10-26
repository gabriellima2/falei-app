import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { Redirect, Tabs, type Href } from 'expo-router'
import { Home } from 'lucide-react-native'
import { BlurView } from 'expo-blur'

import { useAuthenticationStore } from '@/store/authentication-store'

import { ROUTES } from '@/constants/routes'
import { colors } from '@/styles/theme'

export default function Layout() {
	const { user } = useAuthenticationStore()
	if (!user) return <Redirect href={ROUTES.AUTH.SIGN_IN as Href} />
	if (user && !user.emailVerified) {
		return <Redirect href={ROUTES.AUTH.VERIFY_EMAIL as Href} />
	}
	return (
		<Tabs
			tabBar={(props) => (
				<BlurView
					intensity={80}
					tint='dark'
					className="w-full h-14 self-center bg-layout-foreground"
				>
					<BottomTabBar {...props} />
				</BlurView>
			)}
			screenOptions={{
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: 'transparent',
					height: '100%',
					borderTopWidth: 0,
					elevation: 0,
					shadowOffset: {
						width: 0,
						height: 0,
					},
				},
			}}
			sceneContainerStyle={{
				backgroundColor: colors.layout.background,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Home
							size={24}
							color={focused ? colors.base.primary : colors.base.text}
							accessibilityLabel="Início"
						/>
					),
				}}
			/>
		</Tabs>
	)
}
