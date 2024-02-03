import { Book, Shell } from "lucide-react-native";
import styled, { useTheme } from "styled-components/native";

import { ButtonLink, ContainerWithDefaultSpaces, Header } from "@/ui/atoms";

export const SelectExerciseType = () => {
	const { colors } = useTheme();
	return (
		<>
			<Header title="Selecione o tipo do exercício" withBack />
			<Container horizontalSpacing>
				<ButtonLink
					secondary
					withArrowRight
					href={{ pathname: "/(exercises)/create-breathing-exercise" }}
					leftIcon={(props) => <Shell {...props} color={colors.font.primary} />}
				>
					Respiração
				</ButtonLink>
				<ButtonLink
					secondary
					withArrowRight
					href={{ pathname: "/(exercises)/create-poem-exercise" }}
					leftIcon={(props) => <Book {...props} color={colors.font.primary} />}
				>
					Poema
				</ButtonLink>
				<ButtonLink
					secondary
					withArrowRight
					href={{ pathname: "/(exercises)/create-tongue-twister-exercise" }}
					leftIcon={(props) => <Book {...props} color={colors.font.primary} />}
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
