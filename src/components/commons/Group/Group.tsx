import { ReactNode } from "react";
import styled, { css } from "styled-components/native";

import { Typography } from "../Typography";
import { TextLink } from "../Links";

export type GroupProps = {
	title: string;
	rightLink?: { text: string; pathname: string };
	children: ReactNode;
};

export const Group = (props: GroupProps) => {
	const { title, children, rightLink } = props;
	return (
		<Container>
			<Header>
				<Title subtitle>{title}</Title>
				{!!rightLink && (
					<TextLink href={{ pathname: rightLink.pathname }}>
						{rightLink.text}
					</TextLink>
				)}
			</Header>
			{children}
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[3]};
	`}
`;

const Header = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: ${theme.spaces[3]};
	`}
`;

const Title = styled(Typography.Title)``;
