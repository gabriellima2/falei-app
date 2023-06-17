import styled from "styled-components/native";

export type IndicatorProps = {
	currentPosition: number;
	dataAmount: number;
	isActive: boolean;
	handlePress: (item: number) => void;
};

export const Indicator = (props: IndicatorProps) => {
	const { dataAmount, currentPosition, isActive, handlePress } = props;
	return (
		<Button
			onPress={isActive ? undefined : () => handlePress(currentPosition)}
			accessibilityState={{ selected: isActive, disabled: isActive }}
			accessibilityRole="button"
			accessibilityLabel={`${currentPosition} de ${dataAmount}`}
			accessibilityHint={
				isActive ? undefined : `Mudar para o item ${currentPosition}`
			}
		/>
	);
};

const Button = styled.TouchableOpacity``;
