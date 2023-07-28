import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	AuthForm,
} from "@/components";
import { useLogin, type UseLoginParams } from "./hooks/use-login";

export type LoginProps<T> = UseLoginParams<T>;

export function Login<T>(props: LoginProps<T>) {
	const { authentication } = props;
	const { handleSignIn } = useLogin({ authentication });

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
