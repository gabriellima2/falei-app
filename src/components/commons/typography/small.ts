import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

type SmallProps = {
	isAccent?: boolean;
};

type SmallVariants = keyof Pick<SmallProps, "isAccent">;

const modifiers: Modifiers<SmallVariants> = {
	isAccent: (theme) => css`
		font-family: ${theme.fontFamily.main.medium};
	`,
};

export const Small = styled.Text<SmallProps>`
	${({ theme, isAccent }) => css`
		color: ${theme.colors.font.secondary};
		font-size: ${theme.fontSizes.sm};
		font-family: ${theme.fontFamily.main.regular};
		${isAccent && modifiers.isAccent(theme)}
	`}
`;
