import styled, { css } from "styled-components/native";

export const Container = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[4]};
		flex-direction: column;
	`}
`;

export const Footer = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[1]};
		flex-direction: column;
	`}
`;
