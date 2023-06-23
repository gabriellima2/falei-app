import styled, { css } from "styled-components/native";

export const ContainerWithHorizontalSpacing = styled.View`
	${({ theme }) => css`
		padding-left: ${theme.spaces[3]};
		padding-right: ${theme.spaces[3]};
	`}
`;
