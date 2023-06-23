import { useState } from "react";
import styled, { css } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
	BaseButton,
	OnboardingItem,
	CarouselList,
	ContainerWithHorizontalSpacing,
} from "@/components";

interface Onboarding {
	id: string;
	title: string;
	description: string;
	image: { src: string; alt: string };
}

const data: Onboarding[] = [
	{
		id: "1",
		image: {
			src: require("../public/assets/onboarding/img1.png"),
			alt: "Imagem 1",
		},
		title: "Melhore o controle de sua respiração",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "2",
		image: {
			src: require("../public/assets/onboarding/img1.png"),
			alt: "Imagem 1",
		},
		title: "Melhore o controle de sua respiração",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];

export default function Home() {
	const [currentItem, setCurrentItem] = useState(0);

	return (
		<>
			<Container>
				<CarouselList
					data={data}
					currentItem={currentItem}
					changeCurrentItem={(item) => setCurrentItem(item)}
					Item={(props) => <OnboardingItem {...props} img={props.image} />}
				/>
			</Container>
			<Footer>
				<BaseButton bordered>Voltar</BaseButton>
				<BaseButton
					rightIcon={(props) => <Ionicons name="arrow-forward" {...props} />}
				>
					Próximo
				</BaseButton>
			</Footer>
		</>
	);
}

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
