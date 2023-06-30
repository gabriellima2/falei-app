import styled, { css, useTheme } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

export const BackButton = () => {
	const { colors } = useTheme();
	const { goBack } = useNavigation();
	return (
		<Button onPress={goBack} activeOpacity={0.7}>
			<AntDesign name="arrowleft" color={colors.font.primary} size={20} />
		</Button>
	);
};

const Button = styled.TouchableOpacity`
	${({ theme }) => css`
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		border: 1px solid ${theme.colors.overlay};
		border-radius: 1000px;
	`}
`;
