import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TabBarElements, TabBar } from "@/components";
import { theme } from "@/styles/theme";

export default function Layout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			sceneContainerStyle={{ backgroundColor: "transparent" }}
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: { color: theme.colors.font.primary },
				tabBarItemStyle: {
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: 12,
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
					...TabBarElements({
						label: "início",
						Icon: (props) => <Ionicons name="home" {...props} />,
					}),
				}}
			/>
		</Tabs>
	);
}
