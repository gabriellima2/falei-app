import { useLogin } from "./hooks/use-login";

import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	AuthForm,
} from "@/components";

export function Login() {
	const { handleSignIn } = useLogin();
	return (
		<KeyboardAvoidingWrapper>
			<ContainerWithDefaultSpaces horizontalSpacing verticalSpacing>
				<AuthForm
					title="Olá, novamente! Entre para continuar"
					button={{ text: "Entrar" }}
					onSubmit={handleSignIn}
				/>
			</ContainerWithDefaultSpaces>
		</KeyboardAvoidingWrapper>
	);
}
