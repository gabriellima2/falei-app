import { Switch, SwitchProps } from "react-native";
import { useTheme } from "styled-components/native";

type ToggleButtonProps = SwitchProps;

export const ToggleButton = (props: ToggleButtonProps) => {
	const { value, ...rest } = props;
	const { colors } = useTheme();
	return (
		<Switch
			trackColor={{ false: colors.overlay, true: colors.brand }}
			thumbColor={value ? colors.utils.purple : colors.font.primary}
			ios_backgroundColor={colors.overlay}
			value={value}
			{...rest}
		/>
	);
};
