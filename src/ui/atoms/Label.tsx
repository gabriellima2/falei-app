import { type ReactNode } from "react";
import styled, { css } from "styled-components/native";

import { Typography } from "./Typography";

type LabelProps = { children: ReactNode; id: string };

export const Label = (props: LabelProps) => {
	const { id, children } = props;
	return <Container nativeID={id}>{children}</Container>;
};

const Container = styled(Typography.Paragraph)`
	${({ theme }) => css`
		color: ${theme.colors.font.primary};
		font-family: ${theme.fontFamily.main.medium};
	`}
`;
