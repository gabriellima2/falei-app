import { useRef } from "react";
import { TextInput, type TouchableOpacityProps } from "react-native";

import { EmailField, PasswordField } from "../Fields";
import { Form } from "@/ui/atoms";

import {
	UseAuthFormStateParams,
	useAuthFormState,
} from "./hooks/use-auth-form-state";

import { focusNextField } from "@/helpers/focus-next-field";

type ButtonProps = Pick<
	TouchableOpacityProps,
	"accessibilityHint" | "accessibilityLabel"
> & { text: string };

export type AuthFormProps = UseAuthFormStateParams & {
	title: string;
	button: ButtonProps;
};

export const AuthForm = (props: AuthFormProps) => {
	const {
		title,
		button: { text, ...buttonRest },
		authenticationService,
	} = props;
	const {
		errors,
		isAuthenticating,
		setValue,
		handleAuthentication,
		handleSubmit,
	} = useAuthFormState({ authenticationService });
	const passwordFieldRef = useRef<null | TextInput>(null);
	return (
		<Form.Root>
			<Form.Title>{title}</Form.Title>
			<Form.Fieldset>
				<EmailField
					errorMessage={errors.email?.message?.toString()}
					onChangeText={(text) => setValue("email", text)}
					onSubmitEditing={() => focusNextField(passwordFieldRef)}
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
