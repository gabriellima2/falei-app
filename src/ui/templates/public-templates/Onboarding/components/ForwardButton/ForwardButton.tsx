import AntDesign from "@expo/vector-icons/AntDesign";

import { BaseButton } from "@/ui/atoms";
import type { IconStyles } from "@/@types/icon-styles";

const actions = {
	next: {
		label: "Próximo",
		hint: "Move para o próximo item",
		icon: undefined,
	},
	continue: {
		label: "Continuar",
		hint: "Redireciona para a tela de autenticação",
		icon: (props: IconStyles) => <AntDesign name="arrowright" {...props} />,
	},
};

type ForwardButtonProps = {
	action: keyof typeof actions;
	onForwardPress: () => void;
};

export const ForwardButton = (props: ForwardButtonProps) => {
	const { action, onForwardPress } = props;
	const attrs = actions[action];
	return (
		<BaseButton
			accessibilityLabel={attrs.label}
			accessibilityHint={attrs.hint}
			onPress={onForwardPress}
			rightIcon={attrs.icon}
		>
			{attrs.label}
		</BaseButton>
	);
};
