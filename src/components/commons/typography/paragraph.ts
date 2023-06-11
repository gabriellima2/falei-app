import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

type ParagraphProps = {
	isSmall?: boolean;
	isAccent?: boolean;
};

type ParagraphVariants = keyof Pick<ParagraphProps, "isSmall" | "isAccent">;

const modifiers: Modifiers<ParagraphVariants> = {
	isSmall: (theme) => css`
		font-size: ${theme.fontSizes.sm};
	`,
	isAccent: (theme) => css`
		font-family: ${theme.fontFamily.main.medium};
	`,
};

export const Paragraph = styled.Text<ParagraphProps>`
	${({ theme, isSmall, isAccent }) => css`
		color: ${theme.colors.font.secondary};
		font-size: ${theme.fontSizes.regular};
		font-family: ${theme.fontFamily.main.regular};
		${isSmall && modifiers.isSmall(theme)}
		${isAccent && modifiers.isAccent(theme)}
	`}
`;
