import { ArrowRight } from "lucide-react-native";

import { EmailField } from "@/ui/components";
import { Form } from "@/ui/atoms";

import {
	useSendEmailFormState,
	type UseSendEmailFormStateParams,
} from "./hooks/use-send-email-form-state";

export type SendEmailFormProps = UseSendEmailFormStateParams;

export const SendEmailForm = (props: SendEmailFormProps) => {
	const {
		isSubmitting,
		errors,
		setValue,
		handleSubmit,
		handleSendPasswordResetEmail,
	} = useSendEmailFormState(props);
	return (
		<Form.Root>
			<EmailField
				returnKeyType="send"
				errorMessage={errors.email?.message?.toString()}
				onChangeText={(text) => setValue("email", text)}
				onSubmitEditing={handleSubmit(handleSendPasswordResetEmail)}
			/>
			<Form.Button
				accessibilityLabel="Prosseguir com a redefinição de senha"
				accessibilityHint="Clique para prosseguir e enviar um link de redefinição de senha para o endereço de e-mail fornecido"
				isSubmitting={isSubmitting}
				onPress={handleSubmit(handleSendPasswordResetEmail)}
				rightIcon={(props) => <ArrowRight {...props} />}
			>
				Continuar
			</Form.Button>
		</Form.Root>
	);
};
