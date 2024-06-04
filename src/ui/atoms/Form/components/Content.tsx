import styled, { css } from "styled-components/native";
import { ContainerWithDefaultSpaces } from "../../ContainerWithDefaultSpaces";

export const Content = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
