import styled, { css } from "styled-components/native";

import { Typography } from "./Typography";
import type { Modifiers } from "@/@types/modifiers";

type AdditionalExerciseInfoProps = {
	hasDarkColors?: boolean;
};

const modifiers: Modifiers<keyof AdditionalExerciseInfoProps> = {
	hasDarkColors: (theme) => css`
		color: ${theme.colors.main};
		background-color: ${theme.colors.main}1A;
	`,
};

export const AdditionalExerciseInfo = styled(
	Typography.Paragraph
)<AdditionalExerciseInfoProps>`
	${({ theme, hasDarkColors }) => css`
		width: 100px;
		max-width: 100px;
		text-align: center;
		border-radius: ${theme.rounded.regular};
		padding: ${theme.spaces[1]};
		color: ${theme.colors.font.primary};
		font-family: ${theme.fontFamily.main.medium};
		font-size: ${theme.fontSizes.xs};
		background-color: ${theme.colors.utils.white}0a;
		${hasDarkColors && modifiers.hasDarkColors(theme)};
	`}
`;
