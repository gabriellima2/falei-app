import { useMemo } from "react";
import styled, { css } from "styled-components/native";

import { BaseLink, Progress, Typography } from "@/components/commons";

export type ExerciseProps = {
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
	} = props;

	const progress = useMemo(() => {
		return Math.trunc((completed / total) * 100);
	}, [completed, total]);

	return (
		<Container
			href={{ pathname: href.pathname, params: { id } }}
			accessibilityLabel="Continuar exercício"
			accessibilityHint="Te levará à outra tela para continuar esse exercício"
		>
			<Header>
				<Name>{title}</Name>
				<Description>Continuar</Description>
			</Header>
			<Progress value={progress} />
		</Container>
	);
};

const Container = styled(BaseLink)`
	${({ theme }) => css`
		padding: ${theme.spaces[3]} ${theme.spaces[4]};
		border: 1px solid ${theme.colors.overlay};
		border-radius: ${theme.rounded.md};
		gap: ${theme.spaces[3]};
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
