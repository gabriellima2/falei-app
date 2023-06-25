import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { css } from "styled-components/native";
import { ThemeProvider } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { ContainerWithDefaultSpaces, Splash } from "@/components";
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
				<Splash />
			) : (
				<SafeContainer>
					<Container bottomSpacing>
						<Stack
							screenOptions={{
								headerShadowVisible: false,
								headerTitleStyle: { color: theme.colors.font.primary },
								headerStyle: {
									backgroundColor: theme.colors.main,
								},
								contentStyle: { backgroundColor: theme.colors.main },
							}}
						/>
					</Container>
				</SafeContainer>
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
