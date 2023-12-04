import { BaseButton } from "@/ui/atoms";

type BackButtonProps = {
	disabled?: boolean;
	onBackPress: () => void;
};

export const BackButton = (props: BackButtonProps) => {
	const { disabled, onBackPress } = props;
	return (
		<BaseButton
			accessibilityLabel="Voltar"
			accessibilityHint="Move para o item anterior"
			onPress={onBackPress}
			secondary
			disabled={disabled}
		>
			Voltar
		</BaseButton>
	);
};
