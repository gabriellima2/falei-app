import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BottomTab, BottomTabElements, NotificationButton } from "@/components";
import { theme } from "@/styles/theme";

export default function Layout() {
	return (
		<Tabs
			tabBar={(props) => <BottomTab {...props} />}
			sceneContainerStyle={{ backgroundColor: "transparent" }}
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: { color: theme.colors.font.primary },
				tabBarItemStyle: {
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: 12,
				},
				headerRightContainerStyle: {
					paddingRight: 16,
				},
				headerTitleContainerStyle: {
					paddingLeft: 0,
				},
				headerStyle: {
					backgroundColor: "transparent",
				},
				tabBarStyle: {
					height: "100%",
					elevation: 0,
					shadowOpacity: 0,
					borderRadius: 32,
					backgroundColor: "transparent",
					borderColor: "transparent",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					...BottomTabElements({
						label: "início",
						title: "2 Exercícios para completar a meta diária",
						Icon: (props) => <Ionicons name="home" {...props} />,
					}),
					headerRight: () => <NotificationButton hasNewNotifications />,
				}}
			/>
		</Tabs>
	);
}
