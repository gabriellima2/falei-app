import { Eye, EyeOff } from "lucide-react-native";
import styled from "styled-components/native";

import { theme } from "@/styles/theme";
import type { IconStyles } from "@/@types/icon-styles";

export type ToggleVisibiltyButtonProps = {
	isVisible?: boolean;
	onPress: () => void;
};

const iconStyles: IconStyles = {
	color: theme.colors.font.primary,
	size: 24,
};

export const ToggleVisibiltyButton = (props: ToggleVisibiltyButtonProps) => {
	const { isVisible, onPress } = props;
	return (
		<Button
			onPress={onPress}
			accessibilityRole="button"
			accessibilityLabel={isVisible ? "Ocultar senha" : "Mostrar senha"}
			accessibilityHint="Alterna a visibilidade da senha"
			accessibilityState={{ selected: isVisible }}
			activeOpacity={0.7}
		>
			{isVisible ? <EyeOff {...iconStyles} /> : <Eye {...iconStyles} />}
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
