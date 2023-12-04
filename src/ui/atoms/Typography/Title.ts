import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

type TitleProps = {
	display?: boolean;
	subtitle?: boolean;
};

type TitleVariants = keyof Pick<TitleProps, "display" | "subtitle">;

const modifiers: Modifiers<TitleVariants> = {
	display: (theme) => css`
		font-size: ${theme.fontSizes.display};
	`,
	subtitle: (theme) => css`
		font-size: ${theme.fontSizes.medium};
	`,
};

export const Title = styled.Text<TitleProps>`
	${({ theme, display, subtitle }) => css`
		font-family: ${theme.fontFamily.main.medium};
		font-size: ${theme.fontSizes.lg};
		color: ${theme.colors.font.primary};
		${display && modifiers.display(theme)};
		${subtitle && modifiers.subtitle(theme)}
	`}
`;
