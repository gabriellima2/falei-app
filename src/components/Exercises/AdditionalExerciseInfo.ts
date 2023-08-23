import styled, { css } from "styled-components/native";
import { Typography } from "../commons";

export const AdditionalExerciseInfo = styled(Typography.Paragraph)`
	${({ theme }) => css`
		width: 115px;
		max-width: 115px;
		text-align: center;
		border-radius: ${theme.rounded.regular};
		padding: ${theme.spaces[1]};
		color: ${theme.colors.font.primary};
		font-family: ${theme.fontFamily.main.medium};
		font-size: ${theme.fontSizes.sm};
		background-color: ${theme.colors.main}1A;
	`}
`;
