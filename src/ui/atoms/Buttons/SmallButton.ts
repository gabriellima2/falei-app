import styled, { css } from "styled-components/native";
import { BaseButton } from "./BaseButton";

const DEFAULT_SIZE = "44px";

export const SmallButton = styled(BaseButton)`
	${({ theme }) => css`
		width: ${DEFAULT_SIZE};
		max-width: ${DEFAULT_SIZE};
		height: ${DEFAULT_SIZE};
		max-height: ${DEFAULT_SIZE};
		min-height: auto;
		align-items: center;
		justify-content: center;
		padding: 0px;
		border-radius: ${theme.rounded.regular};
	`}
`;
