import styled, { css, useTheme } from "styled-components/native";
import { type TextInputProps } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Modifiers } from "@/@types/modifiers";

type IconDefaultProps = { color: string; size: number };

export type InputProps = Omit<TextInputProps, "placeholderTextColor"> & {
	leftIcon?: (props: IconDefaultProps) => JSX.Element;
	rightIcon?: (props: IconDefaultProps) => JSX.Element;
	isInvalid?: boolean;
};

export const Input = (props: InputProps) => {
	const { leftIcon, rightIcon, isInvalid, ...rest } = props;
	const { colors } = useTheme();
	return (
		<Container isInvalid={isInvalid}>
			{!!leftIcon && leftIcon({ color: colors.font.secondary, size: 24 })}
			<TextInput
				testID="input"
				isInvalid={isInvalid}
				placeholderTextColor={colors.font.secondary}
				{...rest}
			/>
			{isInvalid && (
				<MaterialIcons
					name="error"
					color={colors.feedbacks.alert}
					size={24}
					accessibilityLabel="Campo inválido"
				/>
			)}
			{!!rightIcon &&
				!isInvalid &&
				rightIcon({ color: colors.font.secondary, size: 24 })}
		</Container>
	);
};

type DefaultProps = Pick<InputProps, "isInvalid">;

const modifiers: Modifiers<keyof DefaultProps> = {
	isInvalid: (theme) => css`
		border-color: ${theme.colors.feedbacks.alert};
	`,
};

const Container = styled.View<DefaultProps>`
	${({ theme, isInvalid }) => css`
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
		${isInvalid && modifiers.isInvalid(theme)};
	`}
`;

const TextInput = styled.TextInput<DefaultProps>`
	${({ theme, isInvalid }) => css`
		flex: 1;
		height: 100%;
		color: ${theme.colors.font.primary};
		font-size: ${theme.fontSizes.regular};
		font-family: ${theme.fontFamily.main.regular};
		${isInvalid && modifiers.isInvalid(theme)};
	`}
`;
