import type { ReactNode } from "react";
import styled, { css } from "styled-components/native";

import {
	ContainerWithDefaultSpaces,
	type ContainerWithDefaultSpacesProps,
} from "../../ContainerWithDefaultSpaces";

type ContainerDefaultProps = Omit<
	ContainerWithDefaultSpacesProps,
	"children"
> & {
	children?: ReactNode | ReactNode[];
};

export const Root = (props: ContainerDefaultProps) => (
	<Content horizontalSpacing {...props} />
);

const Content = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
