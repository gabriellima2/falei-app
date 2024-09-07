/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, usePathname } from 'expo-router'
import { View } from 'react-native'

const PATHS_WITH_BOTTOM_TAB = ['/', '/settings']

export default function Layout() {
	const path = usePathname()
	return (
		<Tabs
			initialRouteName="index"
			tabBar={(props) =>
				PATHS_WITH_BOTTOM_TAB.includes(path) ? <View></View> : null
			}
			sceneContainerStyle={{
				backgroundColor: 'transparent',
			}}
			screenOptions={{}}
		>
			<Tabs.Screen name="index" options={{}} />
		</Tabs>
	)
}
