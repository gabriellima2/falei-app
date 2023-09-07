import styled, { css } from "styled-components/native";

import { Typography } from "../Typography";
import { BaseLink, type BaseLinkProps } from "./BaseLink";

import type { Modifiers } from "@/@types/modifiers";

type TextProps = {
	secondary?: boolean;
	small?: boolean;
};

export type TextLinkProps<TParams extends object> = BaseLinkProps<TParams> &
	TextProps;

export const TextLink = <TParams extends object>(
	props: TextLinkProps<TParams>
) => {
	const { secondary, small, children, ...rest } = props;
	return (
		<Container {...rest}>
			<Text secondary={secondary} small={small}>
				{children}
			</Text>
		</Container>
	);
};

const modifiers: Modifiers<keyof TextProps> = {
	secondary: (theme) => css`
		color: ${theme.colors.font.secondary};
	`,
	small: (theme) => css`
		font-size: ${theme.fontSizes.xs};
	`,
};

const Container = styled(BaseLink)``;

const Text = styled(Typography.Paragraph)<TextProps>`
	${({ theme, secondary, small }) => css`
		font-size: ${theme.fontSizes.regular};
		font-family: ${theme.fontFamily.main.medium};
		color: ${theme.colors.font.primary};
		${secondary && modifiers.secondary(theme)};
		${small && modifiers.small(theme)};
	`}
`;
