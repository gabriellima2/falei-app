import { type ReactNode } from "react";
import styled from "styled-components/native";

import { BaseLink, BaseLinkProps, Typography } from "@/components/commons";

import { theme } from "@/styles/theme";
import type { IconStyles } from "@/@types/icon-styles";

export type BaseExerciseProps<TParams extends object> = Pick<
	BaseLinkProps<TParams>,
	"href"
> & {
	title: string;
	children?: ReactNode;
	icon: (props: IconStyles) => JSX.Element;
};

export const BaseExercise = <TParams extends object>(
	props: BaseExerciseProps<TParams>
) => {
	const { title, href, icon, children } = props;
	return (
		<Container href={href}>
			<Icon>{icon({ color: theme.colors.utils.white, size: 24 })}</Icon>
			<Content>
				<Title>{title}</Title>
				{children}
			</Content>
		</Container>
	);
};

const Container = styled(BaseLink)``;

const Icon = styled.View``;

const Content = styled.View``;

const Title = styled(Typography.Title)``;
