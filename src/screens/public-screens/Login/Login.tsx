import {
	ContainerWithDefaultSpaces,
	KeyboardAvoidingWrapper,
	AuthForm,
} from "@/components";

export function Login() {
	return (
		<KeyboardAvoidingWrapper>
			<ContainerWithDefaultSpaces horizontalSpacing verticalSpacing>
				<AuthForm
					title="Olá, novamente! Entre para continuar"
					button={{ text: "Entrar" }}
					onSubmit={(data) => console.log(data)}
				/>
			</ContainerWithDefaultSpaces>
		</KeyboardAvoidingWrapper>
	);
}
