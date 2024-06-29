import { Bell, Trash2 } from "lucide-react-native";
import type { IconStyles } from "@/@types/icon-styles";

export const interactions = {
	create: {
		text: "Definir Lembrete",
		icon: (props: IconStyles) => <Bell {...props} />,
	},
	remove: {
		text: "Excluir exercício",
		icon: (props: IconStyles) => <Trash2 {...props} />,
	},
};
