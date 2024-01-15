import { Linking } from "react-native";
import styled from "styled-components/native";

import { BaseButton, ButtonLink } from "@/ui/atoms";
import { CheckYourEmail } from "@/ui/components";

export const EmailSentToChangePassword = () => {
	return (
		<CheckYourEmail
			description="Foi enviado para o seu endereço de e-mail um link para você criar uma nova senha."
			renderActions={() => (
				<>
					<CheckEmailButton
						accessibilityLabel="Verificar endereço de e-mail"
						accessibilityHint="Clique para abrir o aplicativo de e-mail padrão do seu dispositivo"
						onPress={() => Linking.openURL("mailto:")}
					>
						Verificar seu endereço de e-mail
					</CheckEmailButton>
					<CheckEmailLaterButton
						accessibilityLabel="Adiar verificação de e-mail"
						accessibilityHint="Clique para adiar a verificação de e-mail e voltar para a tela de login"
						onlyText
						href={{ pathname: "(auth)/login" }}
					>
						Prefiro fazer isso mais tarde
					</CheckEmailLaterButton>
				</>
			)}
		/>
	);
};

const CheckEmailButton = styled(BaseButton)``;

const CheckEmailLaterButton = styled(ButtonLink)``;
