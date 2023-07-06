import styled, { css } from "styled-components/native";
import { Typography } from "../../Typography";

export const Title = styled(Typography.Title)`
	${({ theme }) => css`
		max-width: 60%;
		margin-bottom: ${theme.spaces[5]};
	`}
`;
