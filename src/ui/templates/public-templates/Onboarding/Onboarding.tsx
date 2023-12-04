import styled, { css } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useOnboardingState } from "./hooks/use-onboarding-state";

import { BaseButton, ContainerWithDefaultSpaces } from "@/ui/atoms";
import { Carousel } from "./components/Carousel";

import { defaultItems } from "./constants/default-items";

export const Onboarding = () => {
	const { currentItem, isLast, isFirst, back, next, navigateTo } =
		useOnboardingState();
	return (
		<>
			<Container>
				<Carousel
					items={defaultItems}
					currentItem={currentItem}
					onCurrentItemChange={(index) => navigateTo(index)}
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
