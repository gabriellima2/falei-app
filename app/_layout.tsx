import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, NativeModules } from "react-native";
import styled, { css } from "styled-components/native";
import { ThemeProvider } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { SplashScreen } from "@/components";

import { theme } from "@/styles/theme";

export default function RootLayout() {
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
				<SafeContainer>
					<Container>
						<Slot />
					</Container>
				</SafeContainer>
			)}
		</ThemeProvider>
	);
}

type ContainerProps = {
	hasHorizontalSpacing?: boolean;
};

const STATUSBAR_HEIGHT =
	Platform.OS === "ios" ? 16 : NativeModules.StatusBarManager.HEIGHT + 16;

const SafeContainer = styled.SafeAreaView`
	${({ theme }) => css`
		flex: 1;
		background-color: ${theme.colors.main};
	`}
`;

const Container = styled.View<ContainerProps>`
	${({ theme, hasHorizontalSpacing = true }) => css`
		flex: 1;
		padding-top: ${STATUSBAR_HEIGHT}px;
		padding-left: ${hasHorizontalSpacing ? theme.spaces[3] : 0};
		padding-right: ${hasHorizontalSpacing ? theme.spaces[3] : 0};
		padding-bottom: ${theme.spaces[3]};
		background-color: ${theme.colors.main};
	`}
`;
