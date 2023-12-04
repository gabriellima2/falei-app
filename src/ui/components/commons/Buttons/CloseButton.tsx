import { type TouchableOpacityProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type CloseButtonProps = Omit<
	TouchableOpacityProps,
	"accessibilityLabel" | "activeOpacity"
>;

export const CloseButton = (props: CloseButtonProps) => {
	const { colors } = useTheme();

	return (
		<Button activeOpacity={0.7} accessibilityLabel="Fechar" {...props}>
			<AntDesign name="close" color={colors.font.secondary} size={24} />
		</Button>
	);
};

const Button = styled.TouchableOpacity`
	padding: 12px;
`;
