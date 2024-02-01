import { Plus } from "lucide-react-native";

import { ButtonLink } from "@/ui/atoms";
import { theme } from "@/styles/theme";

export const AddExerciseButton = () => {
	return (
		<ButtonLink
			size="sm"
			href={{ pathname: "/(exercises)/add-exercise" }}
			secondary
			accessibilityLabel="Adicionar Exercício"
			accessibilityHint="Adicionar novo exercício"
		>
			<Plus color={theme.colors.font.primary} size={20} />
		</ButtonLink>
	);
};
