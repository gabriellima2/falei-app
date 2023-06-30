import styled, { css } from "styled-components/native";
import { ContainerWithDefaultSpaces } from "./ContainerWithDefaultSpaces";

export const ScreenContent = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		padding-top: ${theme.spaces[4]};
	`}
`;
