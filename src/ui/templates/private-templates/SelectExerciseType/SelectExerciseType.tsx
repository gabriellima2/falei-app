import { ArrowRight, Book, Shell } from "lucide-react-native";
import styled from "styled-components/native";

import { ButtonLink, ContainerWithDefaultSpaces, Header } from "@/ui/atoms";
import { theme } from "@/styles/theme";

export const SelectExerciseType = () => {
	return (
		<>
			<Header title="Selecione o tipo do exercício" />
			<Container horizontalSpacing>
				<ButtonLink
					secondary
					href={{ pathname: "/(exercises)/create-breathing-exercise" }}
					leftIcon={(props) => (
						<Shell {...props} color={theme.colors.font.primary} />
					)}
					rightIcon={(props) => (
						<ArrowRight {...props} color={theme.colors.font.primary} />
					)}
				>
					Respiração
				</ButtonLink>
				<ButtonLink
					secondary
					href={{ pathname: "/(exercises)/create-poem-exercise" }}
					leftIcon={(props) => (
						<Book {...props} color={theme.colors.font.primary} />
					)}
					rightIcon={(props) => (
						<ArrowRight {...props} color={theme.colors.font.primary} />
					)}
				>
					Poema
				</ButtonLink>
				<ButtonLink
					secondary
					href={{ pathname: "/(exercises)/create-tongue-twister-exercise" }}
					leftIcon={(props) => (
						<Book {...props} color={theme.colors.font.primary} />
					)}
					rightIcon={(props) => (
						<ArrowRight {...props} color={theme.colors.font.primary} />
					)}
				>
					Trava-Língua
				</ButtonLink>
			</Container>
		</>
	);
};

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 16px;
`;
