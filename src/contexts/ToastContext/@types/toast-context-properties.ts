import { Animated } from "react-native";
import { ToastMessage } from "./toast-message";
import { ToastOptions } from "./toast-options";

export type ToastConfig = {
	message: ToastMessage;
	options?: ToastOptions;
};

export interface ToastContextProperties {
	currentPosition: Animated.Value | number;
	config: ToastConfig;
	instantHide: () => void;
	notify: (message: ToastMessage, options?: ToastOptions) => void;
}
