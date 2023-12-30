import styled, { css } from "styled-components/native";

import {
	useCreateAccountState,
	type UseCreateAccountStateParams,
} from "./hooks/use-create-account-state";

import { AuthForm } from "@/ui/components";
import {
	Header,
	AuthLink,
	TextLink,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";

export type CreateAccountProps = UseCreateAccountStateParams;

export function CreateAccount(props: CreateAccountProps) {
	const { signUp } = props;
	const { handleSignUp } = useCreateAccountState({ signUp });
	return (
		<>
			<Header
				headerRight={() => (
					<AuthLink href={{ pathname: "login" }}>Entrar</AuthLink>
				)}
			/>

			<KeyboardAvoidingWrapper>
				<Container bottomSpacing horizontalSpacing verticalSpacing>
					<AuthForm
						title="Bem-vindo! Crie uma conta para continuar"
						button={{ text: "Criar conta" }}
						onSubmit={handleSignUp}
					/>
					<ContinueWithoutAccountLink href={{ pathname: "/" }}>
						Continuar sem conta
					</ContinueWithoutAccountLink>
				</Container>
			</KeyboardAvoidingWrapper>
		</>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		gap: ${theme.spaces[5]};
	`}
`;

const ContinueWithoutAccountLink = styled(TextLink)`
	align-self: center;
`;
