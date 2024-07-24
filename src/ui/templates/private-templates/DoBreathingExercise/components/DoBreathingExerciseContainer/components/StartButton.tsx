import { useTheme } from "styled-components/native";
import { Play } from "lucide-react-native";

import { SmallButton } from "@/ui/atoms";

import { useDoBreathingExerciseContext } from "../../../contexts/DoBreathingExerciseContext";
import { BREATHING_STATUS } from "../../../constants/breathing-status";

export function StartButton() {
	const { status, handleChangeStatus } = useDoBreathingExerciseContext();
	const { colors } = useTheme();
	const isAwaiting = status === BREATHING_STATUS.awaiting;
	return (
		<>
			{isAwaiting && (
				<SmallButton
					secondary
					activeOpacity={0.7}
					accessibilityLabel="Iniciar"
					onPress={() => handleChangeStatus(BREATHING_STATUS.started)}
				>
					<Play color={colors.font.primary} size={20} />
				</SmallButton>
			)}
		</>
	);
}
