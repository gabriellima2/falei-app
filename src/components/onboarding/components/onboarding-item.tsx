import styled from "styled-components/native";
import { Typography } from "../../commons";

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
				source={typeof img.src === "string" ? { uri: img.src } : img.src}
				alt={img.alt}
				accessibilityLabel={img.alt}
			/>
			<TextContainer>
				<Typography.Title>{title}</Typography.Title>
				<Typography.Paragraph>{description}</Typography.Paragraph>
			</TextContainer>
		</Container>
	);
};

const Container = styled.View``;

const Image = styled.Image``;

const TextContainer = styled.View``;
