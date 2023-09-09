import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider, css } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { ContainerWithDefaultSpaces, Splash } from "@/components";
import { Providers } from "@/contexts/Providers";
import { useAuthStore } from "@/store/auth-store";

import { theme } from "@/styles/theme";

export default function RootLayout() {
	const { authHasBeenChecked } = useAuthStore();
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold,
	});

	return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light" />
			{!fontsLoaded && !authHasBeenChecked ? (
				<Splash />
			) : (
				<Providers>
					<SafeContainer>
						<Container>
							<Stack
								screenOptions={{
									headerShown: false,
									animation: "fade",
									contentStyle: { backgroundColor: theme.colors.main },
								}}
							/>
						</Container>
					</SafeContainer>
				</Providers>
			)}
		</ThemeProvider>
	);
}

const SafeContainer = styled.SafeAreaView`
	${({ theme }) => css`
		flex: 1;
		background-color: ${theme.colors.main};
	`}
`;

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		background-color: ${theme.colors.main};
	`}
`;
