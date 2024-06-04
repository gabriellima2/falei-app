import styled, { css } from "styled-components/native";

export const Footer = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;
