import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

type TitleProps = {
	isDisplaySize?: boolean;
};

type TitleVariants = keyof Pick<TitleProps, "isDisplaySize">;

const modifiers: Modifiers<TitleVariants> = {
	isDisplaySize: (theme) => css`
		font-size: ${theme.fontSizes.display};
	`,
};

export const Title = styled.Text<TitleProps>`
	${({ theme, isDisplaySize }) => css`
		font-family: ${theme.fontFamily.main.medium};
		font-size: ${theme.fontSizes.lg};
		color: ${theme.colors.font.primary};
		${isDisplaySize && modifiers.isDisplaySize(theme)}
	`}
`;
