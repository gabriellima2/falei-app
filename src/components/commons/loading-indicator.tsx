import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components/native";

type LoadingIndicatorProps = Pick<ActivityIndicatorProps, "size" | "color">;

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
	const { color, size = "small" } = props;
	const { colors } = useTheme();
	return (
		<ActivityIndicator
			size={size}
			color={color || colors.brand}
			accessibilityLabel="Carregando..."
		/>
	);
};
