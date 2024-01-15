import styled from "styled-components/native";

import { useEmailVerificationState } from "./hooks/use-email-verification-state";

import { BaseButton, Typography } from "@/ui/atoms";
import { CheckYourEmail } from "@/ui/components";

export const EmailVerification = () => {
	const { timer, isSendingTheEmail, handleSendEmailVerification } =
		useEmailVerificationState();
	return (
		<CheckYourEmail
			renderActions={() => (
				<>
					<CheckEmailButton
						disabled={timer > 0 || isSendingTheEmail}
						accessibilityLabel="Verificar endereço de e-mail"
						accessibilityHint="Clique para abrir o aplicativo de e-mail padrão do seu dispositivo"
						onPress={handleSendEmailVerification}
					>
						{isSendingTheEmail ? "Enviando..." : "Enviar novamente!"}
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
