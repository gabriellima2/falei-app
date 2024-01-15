import styled, { css } from "styled-components/native";
import { ContainerWithDefaultSpaces, Typography } from "@/ui/atoms";

export type CheckYourEmailProps = {
	description?: string;
	renderActions: () => JSX.Element;
};

export const CheckYourEmail = (props: CheckYourEmailProps) => {
	const { description, renderActions } = props;
	return (
		<Container horizontalSpacing verticalSpacing>
			<Content>
				<Image
					resizeMode="contain"
					source={require("../../../../public/assets/sended-email.png")}
					accessibilityLabel="Imagem de um e-mail sendo enviado"
				/>
				<TextContainer>
					<Title>Verifique o seu e-mail</Title>
					{description && (
						<Description>
							Foi enviado para o seu endereço de e-mail um link para você criar
							uma nova senha.
						</Description>
					)}
				</TextContainer>
			</Content>
			<Footer>{renderActions()}</Footer>
		</Container>
	);
};

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
`;

const Content = styled.View`
	${({ theme }) => css`
		flex: 1;
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

const Image = styled.Image`
	width: 200px;
	min-width: auto;
	height: 150px;
	min-height: auto;
`;

const TextContainer = styled.View`
	${({ theme }) => css`
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

const Title = styled(Typography.Title)`
	text-align: center;
`;

const Description = styled(Typography.Paragraph)`
	text-align: center;
`;

const Footer = styled.View`
	${({ theme }) => css`
		flex: 1;
		align-items: center;
		gap: ${theme.spaces[2]};
	`}
`;
