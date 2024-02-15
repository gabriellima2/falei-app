import "react-native-gesture-handler";
import "@/config/firebase";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider, css } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { ContainerWithDefaultSpaces, Splash } from "@/ui/atoms";
import { Providers } from "@/ui/providers";

import { useAuthenticationStore } from "@/store/authentication-store";

import { makeNotificationAdapter } from "@/factories/adapters/make-notification-adapter";
import { theme } from "@/styles/theme";

const notificationAdapter = makeNotificationAdapter();

export default function RootLayout() {
	const { authHasBeenChecked } = useAuthenticationStore();
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold,
	});
	useEffect(() => {
		notificationAdapter.getPermissions();
	}, []);
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
