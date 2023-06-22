import styled, { css } from "styled-components/native";
import type { Modifiers } from "@/@types/modifiers";

export type IndicatorProps = {
	currentPosition: number;
	dataAmount: number;
	isActive?: boolean;
	handlePress: (item: number) => void;
};

export const Indicator = (props: IndicatorProps) => {
	const { dataAmount, currentPosition, isActive, handlePress } = props;
	const formattedCurrentPosition = currentPosition + 1;
	return (
		<Button
			isActive={isActive}
			onPress={isActive ? undefined : () => handlePress(currentPosition)}
			accessibilityState={{ selected: isActive, disabled: isActive }}
			accessibilityRole="button"
			accessibilityLabel={`${formattedCurrentPosition} de ${dataAmount}`}
			accessibilityHint={
				isActive ? undefined : `Mudar para o item ${formattedCurrentPosition}`
			}
		/>
	);
};

type ButtonProps = Pick<IndicatorProps, "isActive">;

const modifiers: Modifiers<keyof ButtonProps> = {
	isActive: (theme) => css`
		background-color: ${theme.colors.utils.white};
	`,
};

const Button = styled.TouchableOpacity<ButtonProps>`
	${({ theme, isActive }) => css`
		width: 12px;
		height: 12px;
		border-radius: 1000px;
		background-color: ${theme.colors.utils.darkGray};
		${isActive && modifiers.isActive(theme)};
	`}
`;
