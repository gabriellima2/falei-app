import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

import { Paragraph } from "../typography/paragraph";

export type BaseButtonProps = TouchableOpacityProps & {
	rightIcon?: () => JSX.Element;
	leftIcon?: () => JSX.Element;
};

export const BaseButton = (props: BaseButtonProps) => {
	const { children, rightIcon, leftIcon, ...rest } = props;
	return (
		<Button {...rest}>
			<Container>
				{!!leftIcon && leftIcon()}
				<Text>{children}</Text>
			</Container>
			{!!rightIcon && rightIcon()}
		</Button>
	);
};

const Button = styled.TouchableOpacity``;

const Container = styled.View``;

const Text = styled(Paragraph)`
	${({ theme }) => css`
		font-family: ${theme.fontFamily.main.medium};
	`}
`;
