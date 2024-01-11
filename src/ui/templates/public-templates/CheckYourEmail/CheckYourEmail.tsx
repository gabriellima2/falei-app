import { Linking } from "react-native";
import styled, { css } from "styled-components/native";

import {
	BaseButton,
	ButtonLink,
	Typography,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";

export const CheckYourEmail = () => {
	return (
		<Container horizontalSpacing verticalSpacing>
			<Content>
				<Image
					resizeMode="contain"
					source={require("../../../../../public/assets/sended-email.png")}
				/>
				<TextContainer>
					<Title>Verifique o seu e-mail</Title>
					<Description>
						Foi enviado para o seu endereço de e-mail um link para você criar
						uma nova senha.
					</Description>
				</TextContainer>
			</Content>
			<Footer>
				<BaseButton onPress={() => Linking.openURL("mailto:")}>
					Verificar seu endereço de e-mail
				</BaseButton>
				<ButtonLink onlyText href={{ pathname: "(auth)/login" }}>
					Prefiro fazer isso mais tarde
				</ButtonLink>
			</Footer>
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
