import styled, { css } from "styled-components/native";
import { BaseButton } from "../../Buttons";

export const Button = styled(BaseButton)`
	${({ theme }) => css`
		margin-top: ${theme.spaces[5]};
	`}
`;
