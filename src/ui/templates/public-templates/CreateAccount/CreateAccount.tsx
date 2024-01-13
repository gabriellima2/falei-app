import { Redirect } from "expo-router";
import styled, { css } from "styled-components/native";

import { useCreateAccountState } from "./hooks/use-create-account-state";

import { AuthForm } from "@/ui/components";
import {
	Header,
	AuthLink,
	BaseButton,
	LoadingIndicator,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";

export function CreateAccount() {
	const {
		user,
		wasAnonymousAuthUsed,
		isLoadingAsAnonymous,
		handleSignUp,
		handleAnonymous,
	} = useCreateAccountState();
	if (user && wasAnonymousAuthUsed) return <Redirect href="/(tabs)/" />;
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
						authenticationService={handleSignUp}
					/>
					<Footer>
						<AnonymousButton
							disabled={isLoadingAsAnonymous}
							onlyText
							onPress={handleAnonymous}
							accessibilityLabel="Continuar sem conta"
							accessibilityHint="Comecará a usar o aplicativo como anônimo"
						>
							Continuar sem conta
						</AnonymousButton>
						{isLoadingAsAnonymous && <LoadingIndicator size="small" />}
					</Footer>
				</Container>
			</KeyboardAvoidingWrapper>
		</>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		gap: ${theme.spaces[2]};
	`}
`;

const Footer = styled.View`
	${({ theme }) => css`
		flex-direction: column;
		align-items: center;
		gap: ${theme.spaces[1]};
	`}
`;

const AnonymousButton = styled(BaseButton)``;
