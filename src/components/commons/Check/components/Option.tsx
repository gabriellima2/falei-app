import styled, { css } from "styled-components/native";

import { Typography } from "../../Typography";
import type { Modifiers } from "@/@types/modifiers";

export type OptionProps = ButtonProps & {
	name: string;
	value: string;
	onPress?: (value: string) => void;
};

export const Option = (props: OptionProps) => {
	const { name, value, isChecked, onPress } = props;
	return (
		<Button
			onPress={onPress && (() => onPress(value))}
			isChecked={isChecked}
			accessibilityLabel={name}
			accessibilityHint={`Selecionará a opção com o valor ${name}`}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: isChecked }}
			testID="check-option"
		>
			<Text>{name}</Text>
		</Button>
	);
};

type ButtonProps = { isChecked?: boolean };
const modifiers: Modifiers<keyof ButtonProps> = {
	isChecked: (theme) => css`
		background-color: ${theme.colors.utils.white};
	`,
};

const Button = styled.TouchableOpacity<ButtonProps>`
	${({ theme, isChecked }) => css`
		${isChecked && modifiers.isChecked(theme)};
	`}
`;

const Text = styled(Typography.Paragraph)``;
