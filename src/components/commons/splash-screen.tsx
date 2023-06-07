import styled, { css } from "styled-components/native";
import { LoadingIndicator } from "./loading-indicator";

export const SplashScreen = () => {
	return (
		<Container>
			<Logo source={require("../../../assets/splash.png")} resizeMode="cover">
				<LoadingIndicator />
			</Logo>
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
	background-color: #000000;
`;

const Logo = styled.ImageBackground`
	${({ theme }) => css`
		flex: 1;
		justify-content: flex-end;
		padding: ${theme.spaces[3]};
	`}
`;
