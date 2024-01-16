import styled from "styled-components/native";

import { useEmailVerificationState } from "./hooks/use-email-verification-state";

import { BaseButton, Typography } from "@/ui/atoms";
import { CheckYourEmail } from "@/ui/components";

export const EmailVerification = () => {
	const { timer, isSendingTheEmail, handleSendEmailVerification } =
		useEmailVerificationState();
	return (
		<CheckYourEmail
			description="Enviamos um link para o seu endereço de e-mail para você verificar a sua conta"
			renderActions={() => (
				<>
					<CheckEmailButton
						disabled={timer > 0 || isSendingTheEmail}
						accessibilityLabel="Verificar endereço de e-mail"
						accessibilityHint="Um link de verificação foi enviado para o seu e-mail para confirmar a sua conta"
						onPress={handleSendEmailVerification}
					>
						{isSendingTheEmail
							? "Aguarde, enviando..."
							: "Reenviar link de verificação"}
					</CheckEmailButton>
					<Typography.Small>
						Enviar novamente em {timer} segundos
					</Typography.Small>
				</>
			)}
		/>
	);
};

const CheckEmailButton = styled(BaseButton)``;
