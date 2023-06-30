import styled, { css, useTheme } from "styled-components/native";
import { type TextInputProps } from "react-native";

type IconDefaultProps = { color: string; size: number };

export type InputProps = Omit<TextInputProps, "placeholderTextColor"> & {
	leftIcon?: (props: IconDefaultProps) => JSX.Element;
	rightIcon?: (props: IconDefaultProps) => JSX.Element;
};

export const Input = (props: InputProps) => {
	const { leftIcon, rightIcon, ...rest } = props;
	const { colors } = useTheme();
	return (
		<Container>
			{!!leftIcon && leftIcon({ color: colors.font.secondary, size: 24 })}
			<TextInput
				testID="input"
				placeholderTextColor={colors.font.secondary}
				{...rest}
			/>
			{!!rightIcon && rightIcon({ color: colors.font.secondary, size: 24 })}
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		width: 100%;
		height: 70px;
		max-height: 70px;
		flex-direction: row;
		align-items: center;
		padding: 0px ${theme.spaces[3]};
		gap: ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		border: 1px solid ${theme.colors.overlay};
		background-color: ${theme.colors.utils.darkGray};
	`}
`;

const TextInput = styled.TextInput`
	${({ theme }) => css`
		flex: 1;
		height: 100%;
		color: ${theme.colors.font.primary};
		font-size: ${theme.fontSizes.regular};
		font-family: ${theme.fontFamily.main.regular};
	`}
`;
