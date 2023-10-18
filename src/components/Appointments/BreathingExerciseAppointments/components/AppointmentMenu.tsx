import styled from "styled-components/native";
import { MoreVertical, Clock, BellOff, Trash2 } from "lucide-react-native";

import { useMenuContext } from "@/contexts/MenuContext";

import { theme } from "@/styles/theme";
import type { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const menuOptions: MenuOption[] = [
	{
		text: "Editar lembrete",
		onPress: () => console.log("Editando..."),
		icon: (props) => <Clock {...props} />,
	},
	{
		text: "Desativar notificações",
		onPress: () => console.log("Silenciando..."),
		icon: (props) => <BellOff {...props} />,
	},
	{
		text: "Excluir lembrete",
		onPress: () => console.log("Removendo..."),
		icon: (props) => <Trash2 {...props} />,
	},
];

export const AppointmentMenu = () => {
	const { handleToggle } = useMenuContext();
	return (
		<Button onPress={() => handleToggle(menuOptions)}>
			<MoreVertical color={theme.colors.main} />
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
