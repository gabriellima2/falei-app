import styled, { css } from "styled-components/native";

export const Fieldset = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[3]};
	`}
`;
