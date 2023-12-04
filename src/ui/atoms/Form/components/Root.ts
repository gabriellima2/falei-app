import styled, { css } from "styled-components/native";

export const Root = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
