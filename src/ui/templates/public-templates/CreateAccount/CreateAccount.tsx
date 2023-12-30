import styled, { css } from "styled-components/native";

import {
	useCreateAccountState,
	type UseCreateAccountStateParams,
} from "./hooks/use-create-account-state";

import { AuthForm } from "@/ui/components";
import {
	Header,
	AuthLink,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
	BaseButton,
} from "@/ui/atoms";

export type CreateAccountProps = UseCreateAccountStateParams;

export function CreateAccount(props: CreateAccountProps) {
	const { signUp, anonymous } = props;
	const { isLoadingAsAnonymous, handleSignUp, handleAnonymous } =
		useCreateAccountState({
			signUp,
			anonymous,
		});
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
					<AnonymousButton
						disabled={isLoadingAsAnonymous}
						onlyText
						onPress={handleAnonymous}
						accessibilityLabel="Continuar sem conta"
						accessibilityHint="Comecará a usar o aplicativo como anônimo"
					>
						Continuar sem conta
					</AnonymousButton>
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

const AnonymousButton = styled(BaseButton)`
	align-self: center;
`;
