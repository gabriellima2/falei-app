import {
	BottomTabBar,
	type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";

type BottomTabProps = BottomTabBarProps;

export const BottomTab = (props: BottomTabProps) => {
	const { colors } = useTheme();
	return (
		<LinearGradient
			colors={[`${colors.main}B3`, colors.main, colors.main]}
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				bottom: 0,
				height: 76,
				borderTopLeftRadius: 32,
				borderTopRightRadius: 32,
				borderColor: colors.overlay,
				borderWidth: 1,
				borderBottomWidth: 0,
			}}
			locations={[0.1, 0.7, 1]}
		>
			<BottomTabBar {...props} />
		</LinearGradient>
	);
};
