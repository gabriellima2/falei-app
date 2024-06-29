import { BellOff, Trash2 } from "lucide-react-native";

import { useMenuContext } from "@/contexts/MenuContext";
import { MenuButton } from "@/ui/atoms";

import type { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const options: MenuOption[] = [
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

export const Menu = () => {
	const { handleToggle } = useMenuContext();
	return <MenuButton onPress={() => handleToggle(options)} />;
};
