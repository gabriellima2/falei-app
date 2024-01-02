import { useRef } from "react";
import { TextInput, type TouchableOpacityProps } from "react-native";

import { PasswordField } from "../PasswordField";
import { Form } from "@/ui/atoms";
import { Field } from "../Field";

import { useAuthFormState } from "./hooks/use-auth-form-state";

import { focusNextField } from "@/helpers/focus-next-field";
import type { AuthInputDTO } from "@/dtos/auth.dto";

type ButtonProps = Pick<
	TouchableOpacityProps,
	"accessibilityHint" | "accessibilityLabel"
> & { text: string };

export type AuthFormProps = {
	title: string;
	button: ButtonProps;
	onSubmit: (params: AuthInputDTO) => Promise<void> | void;
};

export const AuthForm = (props: AuthFormProps) => {
	const {
		title,
		button: { text, ...buttonRest },
		onSubmit,
	} = props;
	const {
		errors,
		isAuthenticating,
		setValue,
		handleAuthentication,
		handleSubmit,
	} = useAuthFormState({ onSubmit });
	const passwordFieldRef = useRef<null | TextInput>(null);

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
					onSubmitEditing={() => focusNextField(passwordFieldRef)}
					returnKeyType="next"
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<PasswordField
					labelText="Senha"
					labelId="password"
					ref={passwordFieldRef}
					errorMessage={errors.password?.message?.toString()}
					onChangeText={(text) => setValue("password", text)}
					onSubmitEditing={handleSubmit(handleAuthentication)}
				/>
			</Form.Fieldset>
			<Form.Button
				{...buttonRest}
				isSubmitting={isAuthenticating}
				onPress={handleSubmit(handleAuthentication)}
			>
				{text}
			</Form.Button>
		</Form.Root>
	);
};
