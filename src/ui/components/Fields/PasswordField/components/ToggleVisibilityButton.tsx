import { IconStyles } from "@/@types/icon-styles";
import { theme } from "@/styles/theme";
import { Eye, EyeOff } from "lucide-react-native";
import styled from "styled-components/native";

type ToggleVisibiltyButtonProps = {
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
		<Button onPress={onPress}>
			{isVisible ? <EyeOff {...iconStyles} /> : <Eye {...iconStyles} />}
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
