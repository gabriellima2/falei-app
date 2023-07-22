import AntDesign from "@expo/vector-icons/AntDesign";
import styled, { css } from "styled-components/native";

import { Typography } from "../Typography";
import { useToastContext, type ToastTypes } from "@/contexts/ToastContext";

const icons: Record<ToastTypes, (() => JSX.Element) | null> = {
	warning: () => (
		<AntDesign name="warning" accessibilityLabel="Icone de aviso" />
	),
	alert: () => (
		<AntDesign name="warning" accessibilityLabel="Icone de alerta" />
	),
	success: () => (
		<AntDesign name="check" accessibilityLabel="Icone de sucesso" />
	),
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