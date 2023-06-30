import styled, { css } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useOnboarding } from "./hooks";

import {
	BaseButton,
	OnboardingItem,
	CarouselList,
	ContainerWithDefaultSpaces,
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
			<Footer horizontalSpacing>
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
							? (props) => <AntDesign name="arrowright" {...props} />
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

const Footer = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;
