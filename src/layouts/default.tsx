import { Platform, NativeModules } from "react-native";
import styled, { css } from "styled-components/native";

import type { LayoutDefaultProps } from "./@types/layout-default-props";

type DefaultProps = ContainerProps & LayoutDefaultProps;

export const Default = (props: DefaultProps) => {
	const { children, hasHorizontalSpacing = true } = props;
	return (
		<SafeContainer>
			<Container hasHorizontalSpacing={hasHorizontalSpacing}>
				{children}
			</Container>
		</SafeContainer>
	);
};

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
	${({ theme, hasHorizontalSpacing }) => css`
		flex: 1;
		padding-top: ${STATUSBAR_HEIGHT}px;
		padding-left: ${hasHorizontalSpacing ? theme.spaces[3] : 0};
		padding-right: ${hasHorizontalSpacing ? theme.spaces[3] : 0};
		background-color: ${theme.colors.main};
	`}
`;
