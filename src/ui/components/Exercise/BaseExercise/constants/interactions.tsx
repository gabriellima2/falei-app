import { Bell } from "lucide-react-native";
import type { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const defaultInteractions: MenuOption[] = [
	{
		text: "Definir Lembrete",
		icon: (props) => <Bell {...props} />,
		onPress: () => console.log("Defining reminder..."),
	},
];
const customInteractions: MenuOption[] = [
	...defaultInteractions,
	{
		text: "Editar exercício",
		icon: (props) => <Bell {...props} />,
		onPress: () => console.log("Editing exercise..."),
	},
	{
		text: "Excluir exercício",
		icon: (props) => <Bell {...props} />,
		onPress: () => console.log("Removing exercise..."),
	},
];

export const interactions = {
	custom: customInteractions,
	default: defaultInteractions,
};
