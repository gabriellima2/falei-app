import styled, { css } from "styled-components/native";
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
		align-items: center;
		gap: ${theme.spaces[4]};
	`}
`;

const Image = styled.Image`
	width: 100%;
	max-width: 320px;
	max-height: 250px;
	height: 50%;
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
