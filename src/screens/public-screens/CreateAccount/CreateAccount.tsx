import styled, { css } from "styled-components/native";

import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	BaseButton,
	AuthForm,
} from "@/components";
import { useCreateAccount } from "./hooks/use-create-account";

export function CreateAccount() {
	const { handleSignUp } = useCreateAccount();
	return (
		<KeyboardAvoidingWrapper>
			<Container horizontalSpacing verticalSpacing>
				<AuthForm
					title="Bem-vindo! Crie uma conta para continuar"
					button={{ text: "Criar conta" }}
					onSubmit={handleSignUp}
				/>
				<BaseButton onlyText>Continuar sem conta</BaseButton>
			</Container>
		</KeyboardAvoidingWrapper>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		gap: ${theme.spaces[3]};
		justify-content: space-between;
		padding-bottom: ${theme.spaces[4]};
	`}
`;
