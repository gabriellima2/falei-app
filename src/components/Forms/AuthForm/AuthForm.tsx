import { type TouchableOpacityProps } from "react-native";
import { Field, Form } from "@/components/commons";

type ButtonProps = Pick<
	TouchableOpacityProps,
	"accessibilityHint" | "accessibilityLabel"
> & { text: string };

export type AuthFormProps = {
	title: string;
	button: ButtonProps;
};

export const AuthForm = (props: AuthFormProps) => {
	const {
		title,
		button: { text, ...buttonRest },
	} = props;
	return (
		<Form.Root>
			<Form.Title>{title}</Form.Title>
			<Form.Fieldset>
				<Field
					labelText="Email"
					labelId="email"
					placeholder="Ex: seuemail@gmail.com"
				/>
				<Field
					labelText="Senha"
					labelId="password"
					placeholder="8+ Caracteres"
				/>
			</Form.Fieldset>
			<Form.Button {...buttonRest}>{text}</Form.Button>
		</Form.Root>
	);
};
