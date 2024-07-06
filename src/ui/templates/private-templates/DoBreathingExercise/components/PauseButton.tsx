import { useTheme } from "styled-components/native";
import { Pause } from "lucide-react-native";

import { SmallButton } from "@/ui/atoms";

export function PauseButton() {
	const { colors } = useTheme();
	return (
		<SmallButton secondary activeOpacity={0.7} accessibilityLabel="Pausar">
			<Pause color={colors.font.primary} size={20} />
		</SmallButton>
	);
}
