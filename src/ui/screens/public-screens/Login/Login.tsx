import { AuthForm } from "@/ui/components";
import { useLogin, type UseLoginParams } from "./hooks/use-login";

import {
	Header,
	AuthLink,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";

export type LoginProps<T> = UseLoginParams<T>;

export function Login<T>(props: LoginProps<T>) {
	const { authentication } = props;
	const { handleSignIn } = useLogin({ authentication });

	return (
		<>
			<Header
				headerRight={() => (
					<AuthLink href={{ pathname: "create-account" }}>Criar Conta</AuthLink>
				)}
			/>
			<KeyboardAvoidingWrapper>
				<ContainerWithDefaultSpaces
					bottomSpacing
					horizontalSpacing
					verticalSpacing
				>
					<AuthForm
						title="Olá, novamente! Entre para continuar"
						button={{ text: "Entrar" }}
						onSubmit={handleSignIn}
					/>
				</ContainerWithDefaultSpaces>
			</KeyboardAvoidingWrapper>
		</>
	);
}
