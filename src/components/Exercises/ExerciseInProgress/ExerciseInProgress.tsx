import styled, { css } from "styled-components/native";

import {
	BaseLink,
	type BaseLinkProps,
	Progress,
	Typography,
} from "@/components/commons";

export type ExerciseInProgressProps<TParams extends object> = Pick<
	BaseLinkProps<TParams>,
	"href"
> & {
	name: string;
	currentProgress: number;
};

export const ExerciseInProgress = <TParams extends object>(
	props: ExerciseInProgressProps<TParams>
) => {
	const { name, currentProgress, href } = props;
	return (
		<Container
			href={href}
			accessibilityLabel="Continuar exercício"
			accessibilityHint="Te levará à outra tela para continuar esse exercício"
		>
			<Header>
				<Name>{name}</Name>
				<Description>Continuar</Description>
			</Header>
			<Progress value={currentProgress} />
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
