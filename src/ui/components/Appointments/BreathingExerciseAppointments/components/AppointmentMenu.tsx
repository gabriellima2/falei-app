import { Clock, BellOff, Trash2 } from "lucide-react-native";

import { MenuButton } from "@/components/commons";
import { useMenuContext } from "@/contexts/MenuContext";

import type { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const options: MenuOption[] = [
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
	return <MenuButton onPress={() => handleToggle(options)} />;
};
