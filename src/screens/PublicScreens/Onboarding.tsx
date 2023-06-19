import styled, { css } from "styled-components/native";

import { BaseButton, OnboardingItem } from "@/components";
import { Default } from "@/layouts";

export const Onboarding = () => {
	return (
		<Default>
			<Container>
				<OnboardingItem
					img={{
						src: require("../../../public/assets/onboarding/img1.png"),
						alt: "Imagem 1",
					}}
					title="Melhore o controle de sua respiração"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				/>
			</Container>
			<Footer>
				<BaseButton bordered>Voltar</BaseButton>
				<BaseButton>Próximo</BaseButton>
			</Footer>
		</Default>
	);
};

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const Footer = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;
