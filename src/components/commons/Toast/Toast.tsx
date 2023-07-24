import AntDesign from "@expo/vector-icons/AntDesign";
import styled, { css, useTheme } from "styled-components/native";
import { NativeModules, Dimensions } from "react-native";

import { Typography } from "../Typography";
import { useToastContext } from "@/contexts/ToastContext/hooks/use-toast-context";

import type { ToastTypes } from "@/contexts/ToastContext/@types/toast-types";
import type { IconStyles } from "@/@types/icon-styles";

const icons: Record<ToastTypes, ((props?: IconStyles) => JSX.Element) | null> =
	{
		warning: (props) => (
			<AntDesign name="warning" accessibilityLabel="Warning Icon" {...props} />
		),
		alert: (props) => (
			<AntDesign name="warning" accessibilityLabel="Alert Icon" {...props} />
		),
		success: (props) => (
			<AntDesign name="check" accessibilityLabel="Success Icon" {...props} />
		),
		default: null,
	};

export const Toast = () => {
	const {
		config: { message, options },
	} = useToastContext();
	const { colors } = useTheme();

	const Icon = options?.type && icons[options.type];
	const iconStyles: IconStyles = { color: colors.font.primary, size: 24 };
	return (
		<>
			{message && (
				<Container role="alert">
					<Indicator type={options?.type} testID="toast-indicator" />
					<Content>
						{(options?.Icon && options?.Icon(iconStyles)) ||
							(Icon && Icon(iconStyles))}
						<Message numberOfLines={3}>{message}</Message>
					</Content>
				</Container>
			)}
		</>
	);
};

type IndicatorProps = { type?: ToastTypes };

const screenWidth = Dimensions.get("screen").width;
const STATUSBAR_HEIGHT = NativeModules.StatusBarManager.HEIGHT;

const Container = styled.View`
	${({ theme }) => css`
		width: ${Math.abs(screenWidth)}px;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1000;
		flex-direction: row;
		background-color: ${theme.colors.overlay};
	`}
`;

const Content = styled.View`
	${({ theme }) => css`
		flex: 1;
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
		padding: ${theme.spaces[3]};
		padding-top: ${STATUSBAR_HEIGHT + 8}px;
	`}
`;

const Indicator = styled.View<IndicatorProps>`
	${({ theme, type = "default" }) => css`
		width: 4px;
		height: 100%;
		background-color: ${type === "default"
			? "transparent"
			: theme.colors.feedbacks[type]};
	`}
`;

const Message = styled(Typography.Paragraph)`
	${({ theme }) => css`
		flex: 1;
		color: ${theme.colors.font.primary};
	`}
`;
