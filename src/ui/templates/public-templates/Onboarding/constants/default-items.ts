import type { Onboarding } from "../@types/onboarding";

export const defaultItems: Onboarding[] = [
	{
		id: "1",
		image: {
			src: require("../../../../../../public/assets/onboarding/img1.png"),
			alt: "Imagem 1",
		},
		title: "Melhore o controle de sua respiração",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: "2",
		image: {
			src: require("../../../../../../public/assets/onboarding/img1.png"),
			alt: "Imagem 1",
		},
		title: "Melhore o controle de sua respiração",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];
