import { Tabs, usePathname } from "expo-router";
import { LayoutGrid, Dumbbell, PieChart, Settings } from "lucide-react-native";

import { BottomTab, BottomTabElements } from "@/ui/components/BottomTab";

import { isTablet } from "@/constants/is-tablet";
import { theme } from "@/styles/theme";

const PATHS_WITH_BOTTOM_TAB = ["/", "/analytics"];

export default function Layout() {
	const path = usePathname();
	return (
		<Tabs
			tabBar={(props) =>
				PATHS_WITH_BOTTOM_TAB.includes(path) ? <BottomTab {...props} /> : null
			}
			sceneContainerStyle={{
				backgroundColor: "transparent",
			}}
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: { color: theme.colors.font.primary },
				tabBarItemStyle: {
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: isTablet ? 0 : 12,
					gap: isTablet ? 20 : 0,
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
			<Tabs.Screen
				name="(exercises)"
				options={{
					headerShown: false,
					...BottomTabElements({
						label: "Exercícios",
						Icon: (props) => <Dumbbell {...props} />,
					}),
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					headerShown: false,
					...BottomTabElements({
						label: "Trajetória",
						Icon: (props) => <PieChart {...props} />,
					}),
				}}
			/>
			<Tabs.Screen
				name="(settings)/index"
				options={{
					headerShown: false,
					...BottomTabElements({
						label: "Config",
						Icon: (props) => <Settings {...props} />,
					}),
				}}
			/>
		</Tabs>
	);
}
