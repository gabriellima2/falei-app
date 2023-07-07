import { useTheme } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

import { SmallButton } from "./SmallButton";

export const BackButton = () => {
	const { colors } = useTheme();
	const { goBack } = useNavigation();
	return (
		<SmallButton secondary onPress={goBack} activeOpacity={0.7}>
			<AntDesign name="arrowleft" color={colors.font.primary} size={20} />
		</SmallButton>
	);
};
