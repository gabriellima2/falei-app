import styled from "styled-components/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useMenuContext } from "@/contexts/MenuContext";
import { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const menuOptions: MenuOption[] = [
	{
		text: "Editar agendamento",
		onPress: () => console.log("Editando..."),
		icon: (props) => <MaterialIcons name="schedule" {...props} />,
	},
	{
		text: "Desativar notificações",
		onPress: () => console.log("Silenciando..."),
		icon: (props) => <MaterialIcons name="notifications-off" {...props} />,
	},
	{
		text: "Excluir do agendamento",
		onPress: () => console.log("Removendo..."),
		icon: (props) => <MaterialIcons name="highlight-off" {...props} />,
	},
];

export const ExerciseReminderMenu = () => {
	const { handleToggle } = useMenuContext();
	return (
		<Button onPress={() => handleToggle(menuOptions)}>
			<MaterialIcons name="more-vert" size={24} color="#000" />
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
