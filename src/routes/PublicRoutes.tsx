import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "@/screens";

const Stack = createStackNavigator();

export const PublicRoutes = () => (
	<>
		<Stack.Navigator initialRouteName="Onboarding">
			<Stack.Screen
				name="Onboarding"
				component={Onboarding}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	</>
);
