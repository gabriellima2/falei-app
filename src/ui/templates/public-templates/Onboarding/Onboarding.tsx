import styled, { css } from "styled-components/native";

import { useOnboardingState } from "./hooks/use-onboarding-state";

import { Carousel, BackButton, ForwardButton } from "./components";
import { ContainerWithDefaultSpaces } from "@/ui/atoms";

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
				<BackButton disabled={isFirst} onBackPress={back} />
				<ForwardButton
					action={isLast ? "continue" : "next"}
					onForwardPress={next}
				/>
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
