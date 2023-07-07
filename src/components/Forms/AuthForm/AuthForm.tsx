import { type TouchableOpacityProps } from "react-native";

import { Field, Form } from "@/components/commons";

import type { UserAuthRequestDTO } from "@/dtos/user-dtos/user-auth-dto";
import { useAuthForm } from "./hooks/use-auth-form";

type ButtonProps = Pick<
	TouchableOpacityProps,
	"accessibilityHint" | "accessibilityLabel"
> & { text: string };

export type AuthFormProps = {
	title: string;
	button: ButtonProps;
	onSubmit: (params: UserAuthRequestDTO) => void;
};

export const AuthForm = (props: AuthFormProps) => {
	const {
		title,
		button: { text, ...buttonRest },
		onSubmit,
	} = props;
	const { errors, setValue, handleSubmit } = useAuthForm();

	return (
		<Form.Root>
			<Form.Title>{title}</Form.Title>
			<Form.Fieldset>
				<Field
					labelText="Email"
					labelId="email"
					placeholder="Ex: seuemail@gmail.com"
					errorMessage={errors.email?.message?.toString()}
					onChangeText={(text) => setValue("email", text)}
				/>
				<Field
					labelText="Senha"
					labelId="password"
					placeholder="8+ Caracteres"
				/>
			</Form.Fieldset>
			<Form.Button {...buttonRest} onPress={handleSubmit(onSubmit)}>
				{text}
			</Form.Button>
		</Form.Root>
	);
};
