import { Trash2 } from "lucide-react-native";
import type { IconStyles } from "@/@types/icon-styles";

export const interactions = {
	remove: {
		text: "Excluir lembrete",
		icon: (props: IconStyles) => <Trash2 {...props} />,
	},
};
