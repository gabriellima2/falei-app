import styled, { css } from "styled-components/native";

import { ContainerWithDefaultSpaces, Header, Typography } from "@/ui/atoms";
import { SendEmailForm } from "./components";

export const SendEmail = () => {
	return (
		<>
			<Header withBack />
			<Container horizontalSpacing topSpacing>
				<TextContainer>
					<Typography.Title>Esqueceu a senha?</Typography.Title>
					<Typography.Paragraph>
						Por favor, insira o e-mail associado à sua conta para que possamos
						ajudá-lo a definir uma nova senha
					</Typography.Paragraph>
				</TextContainer>
				<SendEmailForm />
			</Container>
		</>
	);
};

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[6]};
	`}
`;

const TextContainer = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[3]};
	`}
`;
