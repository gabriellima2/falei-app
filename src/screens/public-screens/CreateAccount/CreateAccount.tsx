import styled, { css } from "styled-components/native";

import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	BaseButton,
	AuthForm,
} from "@/components";

export function CreateAccount() {
	return (
		<KeyboardAvoidingWrapper>
			<Container horizontalSpacing verticalSpacing>
				<AuthForm
					title="Bem-vindo! Crie uma conta para continuar"
					button={{ text: "Criar conta" }}
					onSubmit={(data) => console.log(data)}
				/>
				<BaseButton onlyText>Continuar sem conta</BaseButton>
			</Container>
		</KeyboardAvoidingWrapper>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex: 1;
		justify-content: space-between;
		padding-bottom: ${theme.spaces[4]};
	`}
`;
