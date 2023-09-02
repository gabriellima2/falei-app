import { Tabs } from "expo-router";
import { LayoutGrid } from "lucide-react-native";

import { BottomTab, BottomTabElements, NotificationButton } from "@/components";
import { theme } from "@/styles/theme";

export default function Layout() {
	return (
		<Tabs
			tabBar={(props) => <BottomTab {...props} />}
			sceneContainerStyle={{
				backgroundColor: "transparent",
				paddingHorizontal: 16,
				gap: 32,
			}}
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: { color: theme.colors.font.primary },
				tabBarItemStyle: {
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: 12,
				},
				headerTitleContainerStyle: {
					width: "100%",
					left: -16,
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
						Icon: (props) => <LayoutGrid {...props} />,
					}),
					headerRight: () => <NotificationButton hasNewNotifications />,
				}}
			/>
		</Tabs>
	);
}
