import { ReactNode } from "react";
import styled from "styled-components/native";

import { Typography } from "../Typography";
import { BaseLink } from "../Links";

export type GroupProps = {
	title: string;
	rightLink?: { text: string; href: string };
	children: ReactNode;
};

export const Group = (props: GroupProps) => {
	const { title, children, rightLink } = props;
	return (
		<Container>
			<Header>
				<Title>{title}</Title>
				{rightLink && (
					<Link href={{ pathname: rightLink.href }} onlyText>
						{rightLink.text}
					</Link>
				)}
			</Header>
			{children}
		</Container>
	);
};

const Container = styled.View``;

const Header = styled.View``;

const Title = styled(Typography.Title)``;

const Link = styled(BaseLink)``;
