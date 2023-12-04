import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

import { Typography } from "@/ui/atoms";

export type OnboardingItemProps = {
	title: string;
	description: string;
	img: {
		src: ReturnType<NodeRequire> | string;
		alt: string;
	};
};

export const OnboardingItem = (props: OnboardingItemProps) => {
	const { title, description, img } = props;
	return (
		<Container>
			<Image
				resizeMode="contain"
				source={typeof img.src === "string" ? { uri: img.src } : img.src}
				alt={img.alt}
				accessibilityLabel={img.alt}
			/>
			<TextContainer>
				<Title>{title}</Title>
				<Description>{description}</Description>
			</TextContainer>
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		width: ${Dimensions.get("window").width}px;
		align-items: center;
		justify-content: center;
		gap: ${theme.spaces[4]};
		padding: ${theme.spaces[3]};
	`}
`;

const Image = styled.Image`
	width: 320px;
	min-width: auto;
	height: 250px;
	min-height: auto;
`;

const TextContainer = styled.View`
	${({ theme }) => css`
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

const Title = styled(Typography.Title)`
	max-width: 60%;
	text-align: center;
`;

const Description = styled(Typography.Paragraph)`
	text-align: center;
	max-width: 350px;
`;
