import styled from "styled-components/native";

export type IndicatorProps = {
	currentPosition: number;
	dataAmount: number;
	isActive: boolean;
};

export const Indicator = (props: IndicatorProps) => {
	const { dataAmount, currentPosition, isActive } = props;
	return (
		<Button
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
