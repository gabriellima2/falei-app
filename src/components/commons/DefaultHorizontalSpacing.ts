import styled, { css } from "styled-components/native";

export const DefaultHorizontalSpacing = styled.View`
	${({ theme }) => css`
		padding-left: ${theme.spaces[3]};
		padding-right: ${theme.spaces[3]};
	`}
`;
