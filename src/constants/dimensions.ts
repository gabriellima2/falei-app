import { Dimensions } from "react-native";

export const dimensions = {
	window: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	screen: {
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height,
	},
};
