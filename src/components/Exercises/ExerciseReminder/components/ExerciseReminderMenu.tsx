import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useMenuContext } from "@/contexts/MenuContext";

export const ExerciseReminderMenu = () => {
	const { handleToggle } = useMenuContext();
	return (
		<Button onPress={() => handleToggle([{ name: "any" }])}>
			<Ionicons name="ellipsis-vertical" size={24} color="#000" />
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
