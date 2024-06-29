import { Redirect } from "expo-router";
import styled from "styled-components/native";

import { useLoginState } from "./hooks/use-login-state";

import {
	Header,
	AuthLink,
	ButtonLink,
	KeyboardAvoidingWrapper,
} from "@/ui/atoms";
import { AuthForm } from "@/ui/components";

export function Login() {
	const { user, handleSignIn } = useLoginState();
	if (user) return <Redirect href="/(tabs)/" />;
	return (
		<>
			<Header
				headerRight={() => (
					<AuthLink href={{ pathname: "create-account" }}>Criar Conta</AuthLink>
				)}
			/>
			<KeyboardAvoidingWrapper>
				<AuthForm
					title="Olá, novamente! Entre para continuar"
					button={{ text: "Entrar" }}
					authenticationService={handleSignIn}
				>
					<ForgotPasswordLink
						onlyText
						href={{
							pathname: "/(forgot-password)/email-sent-to-change-password",
						}}
					>
						Esqueceu a senha?
					</ForgotPasswordLink>
				</AuthForm>
			</KeyboardAvoidingWrapper>
		</>
	);
}

const ForgotPasswordLink = styled(ButtonLink)``;
