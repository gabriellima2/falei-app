import styled, { css } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useOnboarding } from "./hooks";

import {
	BaseButton,
	OnboardingItem,
	CarouselList,
	ContainerWithHorizontalSpacing,
} from "@/components";

import { onboardingItems } from "./assets";

export const Onboarding = () => {
	const { currentItem, isLast, isFirst, back, next, navigateTo } =
		useOnboarding();

	return (
		<>
			<Container>
				<CarouselList
					data={onboardingItems}
					currentItem={currentItem}
					changeCurrentItem={(item) => navigateTo(item)}
					Item={(props) => <OnboardingItem {...props} img={props.image} />}
				/>
			</Container>
			<Footer>
				<BaseButton
					accessibilityLabel="Voltar"
					accessibilityHint="Move para o item anterior"
					onPress={back}
					secondary
					disabled={isFirst}
				>
					Voltar
				</BaseButton>
				<BaseButton
					accessibilityLabel={isLast ? "Continuar" : "Próximo"}
					accessibilityHint={
						isLast
							? "Redireciona para a tela de autenticação"
							: "Move para o próximo item"
					}
					onPress={next}
					rightIcon={
						isLast
							? (props) => <Ionicons name="arrow-forward" {...props} />
							: undefined
					}
				>
					{isLast ? "Continuar" : "Próximo"}
				</BaseButton>
			</Footer>
		</>
	);
};

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const Footer = styled(ContainerWithHorizontalSpacing)`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;
