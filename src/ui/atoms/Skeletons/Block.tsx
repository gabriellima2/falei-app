import styled, { css } from "styled-components/native";

export const Block = styled.View`
	${({ theme }) => css`
		width: 100%;
		gap: ${theme.spaces[2]};
	`}
`;
