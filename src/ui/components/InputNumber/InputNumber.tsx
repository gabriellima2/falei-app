import { type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

import { Typography } from "@/ui/atoms";

export type InputNumberProps = ViewProps & {
	value: string;
	onDecrement?: () => void;
	onIncrement?: () => void;
};

export const InputNumber = (props: InputNumberProps) => {
	const { value, onDecrement, onIncrement, ...rest } = props;
	return (
		<Container>
			<ControlButton accessibilityLabel="Diminuir" onPress={onDecrement}>
				<ControlButtonText>-</ControlButtonText>
			</ControlButton>
			<CurrentValueContainer {...rest}>
				<CurrentValueText>{value}</CurrentValueText>
			</CurrentValueContainer>
			<ControlButton accessibilityLabel="Aumentar" onPress={onIncrement}>
				<ControlButtonText>+</ControlButtonText>
			</ControlButton>
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		width: 44px;
		border: 1.5px solid ${theme.colors.overlay};
		border-radius: ${theme.rounded.regular};
		background-color: ${theme.colors.utils.darkGray};
	`}
`;

const CurrentValueContainer = styled.View`
	${({ theme }) => css`
		height: 44px;
		border-radius: 1000px;
		align-items: center;
		justify-content: center;
		background-color: ${theme.colors.utils.white};
	`}
`;

const CurrentValueText = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
		color: ${theme.colors.main};
	`}
`;

const ControlButton = styled.TouchableOpacity`
	${({ theme }) => css`
		height: 44px;
		align-items: center;
		padding: ${theme.spaces[2]} 0px;
	`}
`;

const ControlButtonText = styled(Typography.Paragraph)`
	${({ theme }) => css`
		color: ${theme.colors.font.primary};
	`}
`;
