import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { SplashScreen } from "@/components";
import { PublicRoutes } from "@/routes";

import { theme } from "@/styles/theme";

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold,
	});

	return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light" />
			{!fontsLoaded ? (
				<SplashScreen />
			) : (
				<NavigationContainer>
					<PublicRoutes />
				</NavigationContainer>
			)}
		</ThemeProvider>
	);
}
