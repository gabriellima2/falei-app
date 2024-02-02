import { Plus } from "lucide-react-native";

import { ButtonLink } from "@/ui/atoms";
import { theme } from "@/styles/theme";

export const CreateExerciseButton = () => {
	return (
		<ButtonLink
			size="sm"
			href={{ pathname: "/(exercises)/select-exercise-type" }}
			secondary
			accessibilityLabel="Criar Exercício"
			accessibilityHint="Criar novo exercício"
		>
			<Plus color={theme.colors.font.primary} size={20} />
		</ButtonLink>
	);
};
