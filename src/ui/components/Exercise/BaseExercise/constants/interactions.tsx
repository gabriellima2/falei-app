import { Bell } from "lucide-react-native";
import type { IconStyles } from "@/@types/icon-styles";

export const interactions = {
	create: {
		text: "Definir Lembrete",
		icon: (props: IconStyles) => <Bell {...props} />,
	},
	edit: {
		text: "Editar exercício",
		icon: (props: IconStyles) => <Bell {...props} />,
	},
	remove: {
		text: "Excluir exercício",
		icon: (props: IconStyles) => <Bell {...props} />,
	},
};
