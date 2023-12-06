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

export type CreateAccountProps<T> = UseCreateAccountStateParams<T>;

export function CreateAccount<T>(props: CreateAccountProps<T>) {
	const { authentication } = props;
	const { handleSignUp } = useCreateAccountState<T>({ authentication });

	return (
		<>
			<Header
				headerRight={() => (
					<AuthLink href={{ pathname: "login" }}>Entrar</AuthLink>
				)}
			/>

			<KeyboardAvoidingWrapper>
				<Container>
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
		gap: 100px;
		padding-bottom: ${theme.spaces[4]};
	`}
`;

const ContinueWithoutAccountLink = styled(TextLink)`
	align-self: center;
`;
