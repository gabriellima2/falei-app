import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TabBarElements } from "@/components";

export default function Layout() {
	return (
		<Tabs>
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
