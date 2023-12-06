import AntDesign from "@expo/vector-icons/AntDesign";
import styled, { css, useTheme } from "styled-components/native";
import { Dimensions, Animated } from "react-native";

import { Typography, CloseButton } from "@/ui/atoms";

import { useToastContext } from "@/contexts/ToastContext/hooks/use-toast-context";

import type { ToastTypes } from "@/contexts/ToastContext/@types/toast-types";
import type { IconStyles } from "@/@types/icon-styles";

const icons: Record<ToastTypes, ((props?: IconStyles) => JSX.Element) | null> =
	{
		warning: (props) => (
			<AntDesign name="warning" accessibilityLabel="Warning Icon" {...props} />
		),
		alert: (props) => (
			<AntDesign
				name="exclamationcircleo"
				accessibilityLabel="Alert Icon"
				{...props}
			/>
		),
		success: (props) => (
			<AntDesign name="check" accessibilityLabel="Success Icon" {...props} />
		),
		default: null,
	};

export const Toast = () => {
	const {
		currentPosition,
		instantHide,
		config: { message, options },
	} = useToastContext();
	const { colors } = useTheme();

	const DefaultIcon = options?.type && icons[options.type];
	const Icon = options?.Icon ?? DefaultIcon;
	const iconStyles: IconStyles = {
		color:
			options?.type && options.type !== "default"
				? colors.feedbacks[options.type]
				: colors.font.primary,
		size: 20,
	};

	return (
		<>
			<Container
				testID="toast"
				role="alert"
				style={{ transform: [{ translateX: currentPosition }] }}
			>
				{Icon && (
					<Indicator type={options?.type} testID="toast-indicator">
						{Icon(iconStyles)}
					</Indicator>
				)}

				<Content onlyText={!Icon}>
					<Message numberOfLines={3}>{message}</Message>
				</Content>

				<CloseButton
					accessibilityHint="Fecha a mensagem"
					onPress={instantHide}
				/>
			</Container>
		</>
	);
};

type IndicatorProps = { type?: ToastTypes };
type ContentProps = { onlyText?: boolean };

const screenWidth = Dimensions.get("screen").width;

const Container = styled(Animated.View)`
	${({ theme }) => css`
		width: ${Math.abs(screenWidth) - 16}px;
		align-items: center;
		position: absolute;
		bottom: 16px;
		align-self: center;
		z-index: 1000;
		flex-direction: row;
		padding: 6px;
		border-radius: 1000px;
		background-color: ${theme.colors.utils.darkGray};
		border: 1px solid ${theme.colors.overlay};
	`}
`;

const Content = styled.View<ContentProps>`
	${({ theme, onlyText }) => css`
		flex: 1;
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
		padding: 8px;
		padding-left: ${onlyText ? 16 : 8}px;
	`}
`;

const Indicator = styled.View<IndicatorProps>`
	${({ theme, type = "default" }) => css`
		align-items: center;
		justify-content: center;
		border-radius: 1000px;
		width: ${type === "default" ? 50 : 60}px;
		height: ${type === "default" ? 30 : 60}px;
		background-color: ${type === "default"
			? "transparent"
			: theme.colors.feedbacks[type] + "4D"};
	`}
`;

const Message = styled(Typography.Paragraph)`
	${({ theme }) => css`
		flex: 1;
		color: ${theme.colors.font.primary};
		font-size: ${theme.fontSizes.sm};
	`}
`;
