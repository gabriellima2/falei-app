import { type PropsWithChildren } from "react";
import styled, { css } from "styled-components/native";

export const Container = (props: PropsWithChildren) => {
	return <Content>{props.children}</Content>;
};

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
