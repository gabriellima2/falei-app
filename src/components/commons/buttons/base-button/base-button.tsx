import type { TouchableOpacityProps } from "react-native";
import styled, { css, useTheme } from "styled-components/native";

import { Typography } from "@/components/commons/typography";
import type { Modifiers } from "@/@types/modifiers";

type IconProps = { color: string; size: number };

export type BaseButtonProps = TouchableOpacityProps & {
	bordered?: boolean;
	onlyText?: boolean;
	rightIcon?: (props: IconProps) => JSX.Element;
	leftIcon?: (props: IconProps) => JSX.Element;
};

export const BaseButton = (props: BaseButtonProps) => {
	const { children, rightIcon, leftIcon, bordered, onlyText, ...rest } = props;
	const { colors } = useTheme();

	const hasRightIcon = !!rightIcon;
	const hasLeftIcon = !!leftIcon;
	const withContrastStyles = bordered || onlyText;
	const iconColor = bordered || onlyText ? colors.font.primary : colors.main;

	return (
		<Button
			{...rest}
			onlyText={onlyText}
			bordered={bordered}
			alignAtStart={hasRightIcon || hasLeftIcon}
			activeOpacity={0.8}
		>
			<Container>
				{hasLeftIcon && (
					<LeftIconContainer hasContrast={withContrastStyles}>
						{leftIcon({ color: iconColor, size: 24 })}
					</LeftIconContainer>
				)}
				<Text hasContrast={withContrastStyles}>{children}</Text>
			</Container>
			{hasRightIcon && rightIcon({ color: iconColor, size: 24 })}
		</Button>
	);
};

type ButtonProps = Pick<BaseButtonProps, "bordered" | "onlyText"> & {
	alignAtStart?: boolean;
};

type DefaultProps = {
	hasContrast?: boolean;
};

export const modifiers: Modifiers<keyof ButtonProps | keyof DefaultProps> = {
	bordered: (theme) => css`
		border: 1.5px solid ${theme.colors.overlay};
		background-color: ${theme.colors.utils.darkGray};
	`,
	onlyText: () => css`
		height: auto;
		background-color: transparent;
		border: 0px;
	`,
	alignAtStart: () => css`
		justify-content: space-between;
	`,
	hasContrast: (theme) => css`
		border: 1px solid ${theme.colors.overlay};
		background-color: ${theme.colors.utils.darkGray};
	`,
};

export const Button = styled.TouchableOpacity<ButtonProps>`
	${({ theme, alignAtStart, bordered, onlyText }) => css`
		flex: 1;
		width: 100%;
		height: 70px;
		max-height: 70px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: ${theme.spaces[2]} ${theme.spaces[3]};
		border-radius: ${theme.rounded.md};
		background-color: ${theme.colors.utils.white};
		${bordered && modifiers.bordered(theme)}
		${alignAtStart && modifiers.alignAtStart(theme)}
		${onlyText && modifiers.onlyText(theme)}
	`}
`;

export const Container = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
	`}
`;

export const LeftIconContainer = styled.View<DefaultProps>`
	${({ theme, hasContrast }) => css`
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: ${theme.rounded.regular};
		border: 1px solid ${theme.colors.main}2a;
		background-color: ${theme.colors.main}1a;
		${hasContrast && modifiers.hasContrast(theme)}
	`}
`;

export const Text = styled(Typography.Paragraph)<DefaultProps>`
	${({ theme, hasContrast }) => css`
		color: ${hasContrast ? theme.colors.font.primary : theme.colors.main};
		font-family: ${theme.fontFamily.main.medium};
	`}
`;
