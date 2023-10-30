import { Dimensions } from "react-native";
import { margin } from "./margin";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

export const dimensions = {
	window: {
		width: window.width,
		height: window.height,
	},
	screen: {
		width: screen.width,
		height: screen.height,
		withMargin: {
			width: screen.width - margin.vertical.total,
		},
	},
};
