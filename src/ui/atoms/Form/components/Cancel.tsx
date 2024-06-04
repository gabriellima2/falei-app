import { useRouter } from "expo-router";

import {
	BaseButton,
	type BaseButtonProps,
} from "@/ui/atoms/Buttons/BaseButton";

export const Cancel = (props: BaseButtonProps) => {
	const { onPress } = props;
	const { back } = useRouter();
	return (
		<BaseButton
			accessibilityLabel="Cancelar formulário"
			accessibilityHint="Cancela e volta para a página anterior"
			secondary
			{...props}
			onPress={(e) => {
				back();
				onPress && onPress(e);
			}}
		>
			{props.children ?? "Cancelar"}
		</BaseButton>
	);
};
