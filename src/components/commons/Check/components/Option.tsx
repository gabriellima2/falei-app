import styled, { css } from "styled-components/native";

import { Typography } from "../../Typography";
import type { Modifiers } from "@/@types/modifiers";

export type OptionProps = ButtonProps & {
	name: string;
	value: string;
	onPress?: (value: string) => void;
};

export const Option = (props: OptionProps) => {
	const { name, value, isActive, onPress } = props;
	return (
		<Button
			onPress={onPress && (() => onPress(value))}
			isActive={isActive}
			accessibilityLabel={name}
			accessibilityHint={`Selecionará a opção com o valor ${name}`}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: isActive }}
		>
			<Text>{name}</Text>
		</Button>
	);
};

type ButtonProps = { isActive?: boolean };
const modifiers: Modifiers<keyof ButtonProps> = {
	isActive: (theme) => css`
		background-color: ${theme.colors.utils.white};
	`,
};

const Button = styled.TouchableOpacity<ButtonProps>`
	${({ theme, isActive }) => css`
		${isActive && modifiers.isActive(theme)};
	`}
`;

const Text = styled(Typography.Paragraph)``;
