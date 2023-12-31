import { useAuthStore } from "@/store/auth-store";
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
import { Redirect } from "expo-router";

export type LoginProps = UseLoginStateParams;

export function Login(props: LoginProps) {
	const { signIn } = props;
	const { handleSignIn } = useLoginState({ signIn });
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
