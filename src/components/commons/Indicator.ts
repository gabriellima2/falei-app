import styled, { css } from "styled-components/native";

export const Indicator = styled.View`
	${({ theme }) => css`
		width: 6px;
		height: 6px;
		background-color: ${theme.colors.utils.white};
		border-radius: 1000px;
	`}
`;
