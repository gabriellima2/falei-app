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
			secondary
			{...props}
			onPress={(e) => {
				if (!onPress) {
					back();
					return;
				}
				onPress(e);
			}}
		>
			{props.children ?? "Cancelar"}
		</BaseButton>
	);
};
