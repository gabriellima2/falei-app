import styled, { css } from "styled-components/native";

import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	AuthForm,
	TextLink,
} from "@/components";
import {
	useCreateAccount,
	type UseCreateAccountParams,
} from "./hooks/use-create-account";

export type CreateAccountProps<T> = UseCreateAccountParams<T>;

export function CreateAccount<T>(props: CreateAccountProps<T>) {
	const { authentication } = props;
	const { handleSignUp } = useCreateAccount<T>({ authentication });

	return (
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
