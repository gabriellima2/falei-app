import { type ReactNode } from "react";
import styled, { css } from "styled-components/native";

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
				<Title subtitle numberOfLines={5}>
					{title}
				</Title>
				{children}
			</Content>
		</Container>
	);
};

const Container = styled(BaseLink)`
	${({ theme }) => css`
		width: 50%;
		max-width: 190px;
		max-height: 266px;
		gap: ${theme.spaces[4]};
		padding: ${theme.spaces[4]} ${theme.spaces[3]};
		border: 1px solid ${theme.colors.overlay};
		border-radius: ${theme.rounded.md};
		background-color: ${theme.colors.utils.darkGray};
	`}
`;

const Icon = styled.View`
	${({ theme }) => css`
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border: 1px solid ${theme.colors.overlay};
		border-radius: ${theme.rounded.regular};
		background-color: ${theme.colors.utils.white}0a;
	`}
`;

const Content = styled.View`
	gap: 16px;
`;

const Title = styled(Typography.Title)``;
