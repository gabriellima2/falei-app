import { useRef } from 'react'
import { View } from 'react-native'
import { Redirect, Tabs, type Href } from 'expo-router'
import { Home, Plus, Settings } from 'lucide-react-native'

import { useAuthenticationStore } from '@/store/authentication-store'

import { CreateExerciseBottomSheet } from '../../ui/components/bottom-sheet/create-exercise-bottom-sheet'

import { ROUTES } from '@/constants/routes'
import { colors } from '@/styles/theme'

import type { BottomSheetModalElementRef } from '@/@types/general'

export default function Layout() {
	const { user } = useAuthenticationStore()
	const createExerciseBottomSheetRef = useRef<BottomSheetModalElementRef>(null)

	if (!user) return <Redirect href={ROUTES.AUTH.SIGN_IN as Href} />
	if (user && !user.emailVerified) {
		return <Redirect href={ROUTES.AUTH.VERIFY_EMAIL as Href} />
	}

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						backgroundColor: colors.layout.foreground,
						height: 56,
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
				<Tabs.Screen
					name="modal"
					options={{
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<View className="bg-base-primary w-9 h-9 rounded-full aspect-square items-center justify-center">
								<Plus
									size={24}
									color={colors.base['text-foreground']}
									accessibilityLabel="Início"
								/>
							</View>
						),
					}}
					listeners={() => ({
						tabPress: (e) => {
							e.preventDefault()
							createExerciseBottomSheetRef.current?.present()
						}
					})}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<Settings
								size={24}
								color={focused ? colors.base.primary : colors.base.text}
								accessibilityLabel="Configurações"
							/>
						),
					}}
				/>
			</Tabs>
			<CreateExerciseBottomSheet ref={createExerciseBottomSheetRef} />
		</>
	)
}
