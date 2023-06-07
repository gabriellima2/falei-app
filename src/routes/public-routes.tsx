import { createStackNavigator } from "@react-navigation/stack";
import { Introduction } from "@/screens";

const Stack = createStackNavigator();

export const PublicRoutes = () => (
	<>
		<Stack.Navigator initialRouteName="Introduction">
			<Stack.Screen
				name="Introduction"
				component={Introduction}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	</>
);
