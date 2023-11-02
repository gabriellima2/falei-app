import styled, { css } from "styled-components/native";

import { BaseButton, BaseButtonProps } from "../../Buttons";
import type { Modifiers } from "@/@types/modifiers";

export type OptionProps = ButtonProps &
	Pick<BaseButtonProps, "style"> & {
		name: string;
		value: string;
		onPress?: (value: string) => void;
	};

export const Option = (props: OptionProps) => {
	const { name, value, isChecked, onPress, ...rest } = props;
	return (
		<Button
			{...rest}
			onPress={onPress && (() => onPress(value))}
			isChecked={isChecked}
			secondary={!isChecked}
			accessibilityLabel={name}
			accessibilityHint={`Selecionará a opção com o valor ${name}`}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: isChecked }}
			testID="check-option"
		>
			{name}
		</Button>
	);
};

type ButtonProps = { isChecked?: boolean };
const modifiers: Modifiers<keyof ButtonProps> = {
	isChecked: (theme) => css`
		background-color: ${theme.colors.utils.white};
	`,
};

const Button = styled(BaseButton)<ButtonProps>`
	${({ theme, isChecked }) => css`
		width: auto;
		max-width: 140px;
		min-width: auto;
		height: 44px;
		max-height: 44px;
		min-height: 44px;
		border-radius: ${theme.rounded.regular};
		padding: ${theme.spaces[1]} ${theme.spaces[3]};
		${isChecked && modifiers.isChecked(theme)};
	`}
`;
