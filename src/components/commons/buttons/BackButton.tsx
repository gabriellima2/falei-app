import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "expo-router";

import { SmallButton } from "./SmallButton";
import { theme } from "@/styles/theme";

export const BackButton = () => {
	const { goBack } = useNavigation();
	return (
		<SmallButton secondary onPress={goBack} activeOpacity={0.7}>
			<ArrowLeft color={theme.colors.font.primary} size={20} />
		</SmallButton>
	);
};
