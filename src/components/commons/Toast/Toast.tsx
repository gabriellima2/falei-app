import AntDesign from "@expo/vector-icons/AntDesign";
import styled, { css } from "styled-components/native";

import { Typography } from "../Typography";
import { useToastContext } from "@/contexts/ToastContext/hooks/use-toast-context";

import type { ToastTypes } from "@/contexts/ToastContext/@types/toast-types";

const icons: Record<ToastTypes, (() => JSX.Element) | null> = {
	warning: () => <AntDesign name="warning" accessibilityLabel="Warning Icon" />,
	alert: () => <AntDesign name="warning" accessibilityLabel="Alert Icon" />,
	success: () => <AntDesign name="check" accessibilityLabel="Success Icon" />,
	default: null,
};

export const Toast = () => {
	const {
		config: { message, options },
	} = useToastContext();
	const Icon = options?.type && icons[options.type];
	return (
		<>
			{message && (
				<Container role="alert">
					<Indicator type={options?.type} testID="toast-indicator" />
					{(options?.Icon && options?.Icon()) || (Icon && Icon())}
					<Typography.Paragraph>{message}</Typography.Paragraph>
				</Container>
			)}
		</>
	);
};

type IndicatorProps = { type?: ToastTypes };

const Container = styled.View`
	${({ theme }) => css`
		background-color: transparent;
	`}
`;

const Indicator = styled.View<IndicatorProps>`
	${({ theme, type = "default" }) => css`
		flex: 1;
		background-color: ${type === "default"
			? "transparent"
			: theme.colors.feedbacks[type]};
	`}
`;
