import { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { useNavigation } from "expo-router";
import Constants from "expo-constants";

import { BackButton } from "../Buttons";
import { Typography } from "../Typography";

export type HeaderProps = {
	title?: string;
	withBack?: boolean;
	headerRight?: () => JSX.Element;
};

export const Header = (props: HeaderProps) => {
	const { title, withBack, headerRight } = props;
	const [canGoBack, setCanGoBack] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		setCanGoBack(!!withBack && navigation.canGoBack());
	}, []);

	return (
		<Container>
			<LeftContent>
				{canGoBack && <BackButton />}
				<Title numberOfLines={2}>{title}</Title>
			</LeftContent>
			{headerRight && headerRight()}
		</Container>
	);
};

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const Container = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0px ${theme.spaces[3]};
		padding-top: ${STATUSBAR_HEIGHT + 16}px;
		padding-bottom: ${theme.spaces[5]};
		background-color: ${theme.colors.main};
	`}
`;

const LeftContent = styled.View`
	${({ theme }) => css`
		flex: 1;
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

const Title = styled(Typography.Title)`
	max-width: 88%;
`;
