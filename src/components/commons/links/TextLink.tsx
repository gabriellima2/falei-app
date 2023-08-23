import styled, { css } from "styled-components/native";

import { BaseLink, type BaseLinkProps } from "./BaseLink";
import { Typography } from "../Typography";

type TextLinkProps<TParams extends object> = Omit<
	BaseLinkProps<TParams>,
	"onlyText"
>;

export const TextLink = <StackParams extends object>(
	props: TextLinkProps<StackParams>
) => {
	return (
		<Container {...props} onlyText>
			<Text>{props.children}</Text>
		</Container>
	);
};

const Container = styled(BaseLink)`
	flex: none;
	width: auto;
`;

const Text = styled(Typography.Paragraph)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.sm};
		font-family: ${theme.fontFamily.main.medium};
	`}
`;
