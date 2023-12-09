import { useMemo } from "react";
import styled, { css } from "styled-components/native";

import { Progress, Typography } from "@/ui/atoms";
import { BaseLink } from "@/ui/atoms/Links/BaseLink";

import { dimensions } from "@/constants/dimensions";
import { margin } from "@/constants/margin";

import type { Modifiers } from "@/@types/modifiers";

export type ExerciseProps = ContainerProps & {
	id: string;
	title: string;
	href: { pathname: string };
	rounds: { completed: number; total: number };
};

export const Exercise = (props: ExerciseProps) => {
	const {
		id,
		title,
		rounds: { completed, total },
		href,
		withPreviewForNextItem,
	} = props;

	const progress = useMemo(() => {
		return Math.trunc((completed / total) * 100);
	}, [completed, total]);

	return (
		<Container
			href={{ pathname: href.pathname, params: { id } }}
			accessibilityLabel="Continuar exercício"
			accessibilityHint="Te levará à outra tela para continuar esse exercício"
			withPreviewForNextItem={withPreviewForNextItem}
		>
			<Header>
				<Name>{title}</Name>
				<Description>Continuar</Description>
			</Header>
			<Progress value={progress} />
		</Container>
	);
};

type ContainerProps = { withPreviewForNextItem?: boolean };

const { withMargin } = dimensions.screen;
const modifiers: Modifiers<keyof ContainerProps> = {
	withPreviewForNextItem: () => css`
		width: ${withMargin.width - margin.vertical.total}px;
		min-width: 320px;
	`,
};

const Container = styled(BaseLink)<ContainerProps>`
	${({ theme, withPreviewForNextItem }) => css`
		width: ${withMargin.width}px;
		max-width: 390px;
		min-width: 330px;
		padding: ${theme.spaces[3]} ${theme.spaces[4]};
		border: 1px solid ${theme.colors.overlay};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[3]};
		${withPreviewForNextItem && modifiers.withPreviewForNextItem(theme)};
	`}
`;

const Header = styled.View`
	${({ theme }) => css`
		height: 25px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: ${theme.spaces[3]};
	`}
`;

const Name = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
	`}
`;

const Description = styled(Typography.Small)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.xs};
		font-family: ${theme.fontFamily.main.medium};
	`}
`;
