import { Tabs } from "expo-router";
import { LayoutGrid } from "lucide-react-native";

import { BottomTab, BottomTabElements } from "@/components";
import { theme } from "@/styles/theme";

export default function Layout() {
	return (
		<Tabs
			tabBar={(props) => <BottomTab {...props} />}
			sceneContainerStyle={{
				backgroundColor: "transparent",
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
					headerShown: false,
					...BottomTabElements({
						label: "início",
						Icon: (props) => <LayoutGrid {...props} />,
					}),
				}}
			/>
		</Tabs>
	);
}
