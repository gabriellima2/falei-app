import {
	useLoginState,
	type UseLoginStateParams,
} from "./hooks/use-login-state";

import {
	Header,
	AuthLink,
	KeyboardAvoidingWrapper,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";
import { AuthForm } from "@/ui/components";

export type LoginProps<T> = UseLoginStateParams<T>;

export function Login<T>(props: LoginProps<T>) {
	const { authentication } = props;
	const { handleSignIn } = useLoginState({ authentication });

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
