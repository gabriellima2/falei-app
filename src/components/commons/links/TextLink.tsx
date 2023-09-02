import styled, { css } from "styled-components/native";

import { Typography } from "../Typography";
import { BaseLink, type BaseLinkProps } from "./BaseLink";

export type TextLinkProps<TParams extends object> = BaseLinkProps<TParams>;

export const TextLink = <StackParams extends object>(
	props: TextLinkProps<StackParams>
) => {
	return (
		<Container {...props}>
			<Text>{props.children}</Text>
		</Container>
	);
};

const Container = styled(BaseLink)``;

const Text = styled(Typography.Paragraph)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
		font-family: ${theme.fontFamily.main.medium};
		color: ${theme.colors.font.primary};
	`}
`;
