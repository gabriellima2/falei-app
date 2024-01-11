import { Redirect } from "expo-router";
import styled, { css } from "styled-components/native";

import { useAuthStore } from "@/store/auth-store";
import { useLoginState } from "./hooks/use-login-state";

import {
	Header,
	AuthLink,
	ButtonLink,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";
import { AuthForm } from "@/ui/components";

export function Login() {
	const { handleSignIn } = useLoginState();
	const { user } = useAuthStore((state) => state);
	if (user) return <Redirect href="/(tabs)/" />;
	return (
		<>
			<Header
				headerRight={() => (
					<AuthLink href={{ pathname: "create-account" }}>Criar Conta</AuthLink>
				)}
			/>
			<KeyboardAvoidingWrapper>
				<Container bottomSpacing horizontalSpacing verticalSpacing>
					<AuthForm
						title="Olá, novamente! Entre para continuar"
						button={{ text: "Entrar" }}
						authenticationService={handleSignIn}
					/>
					<ForgotPasswordLink
						onlyText
						href={{ pathname: "/(forgot-password)/send-email" }}
					>
						Esqueceu a senha?
					</ForgotPasswordLink>
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

const ForgotPasswordLink = styled(ButtonLink)``;
