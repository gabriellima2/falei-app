import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

type TitleProps = {
	hasDisplaySize?: boolean;
};

type TitleVariants = keyof Pick<TitleProps, "hasDisplaySize">;

const modifiers: Modifiers<TitleVariants> = {
	hasDisplaySize: (theme) => css`
		font-size: ${theme.fontSizes.display};
	`,
};

export const Title = styled.Text<TitleProps>`
	${({ theme, hasDisplaySize = false }) => css`
		font-family: ${theme.fontsFamily.main.bold};
		font-size: ${theme.fontSizes.lg};
		color: ${theme.colors.font.primary};
		${hasDisplaySize && modifiers.hasDisplaySize(theme)}
	`}
`;
