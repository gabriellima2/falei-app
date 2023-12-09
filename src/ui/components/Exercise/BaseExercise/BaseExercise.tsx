import { type ReactNode } from "react";
import styled, { css } from "styled-components/native";

import {
	useBaseExercise,
	type UseBaseExerciseParams,
} from "./hooks/use-base-exercise";

import { Typography, type BaseLinkProps } from "@/ui/atoms";
import { BaseLink } from "@/ui/atoms/Links/BaseLink";

import { theme } from "@/styles/theme";
import type { IconStyles } from "@/@types/icon-styles";

export type BaseExerciseProps<TParams extends object> = BaseLinkProps<TParams> &
	UseBaseExerciseParams & {
		title: string;
		children?: ReactNode;
		icon: (props: IconStyles) => JSX.Element;
	};

export const BaseExercise = <TParams extends object>(
	props: BaseExerciseProps<TParams>
) => {
	const { title, icon, children, id, withCustomOptions, ...rest } = props;
	const { handleLongPress } = useBaseExercise({ id, withCustomOptions });
	return (
		<Container {...rest} onLongPress={handleLongPress}>
			<Icon>{icon({ color: theme.colors.utils.white, size: 24 })}</Icon>
			<Content>
				<Title numberOfLines={4}>{title}</Title>
				{children}
			</Content>
		</Container>
	);
};

const Container = styled(BaseLink)`
	${({ theme }) => css`
		flex: 1;
		max-width: 191px;
		max-height: 243px;
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

const Title = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
		min-height: 40px;
	`}
`;
