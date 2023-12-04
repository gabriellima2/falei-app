import { useState, type ReactNode, useRef } from "react";
import { Animated } from "react-native";

import { Toast } from "@/ui/components";
import { ToastContext } from "./ToastContext";

import { dimensions } from "@/constants/dimensions";

import type { ToastOptions } from "./@types/toast-options";
import type { ToastMessage } from "./@types/toast-message";
import type { ToastConfig } from "./@types/toast-context-properties";

type ToastProviderProps = { children: ReactNode };

const INITIAL_POSITION = dimensions.window.width * -1;
export const DEFAULT_TOAST_TIME = 3000;
const DEFAULT_CONFIG: ToastConfig = {
	message: null,
	options: {
		type: "default",
		time: DEFAULT_TOAST_TIME,
	},
};
const DEFAULT_HIDE_ANIMATION: Animated.TimingAnimationConfig = {
	toValue: INITIAL_POSITION,
	duration: 150,
	useNativeDriver: true,
};

export const ToastProvider = (props: ToastProviderProps) => {
	const { children } = props;
	const [config, setConfig] = useState<ToastConfig>(DEFAULT_CONFIG);
	const currentPosition = useRef(new Animated.Value(INITIAL_POSITION)).current;

	const show = () => {
		Animated.timing(currentPosition, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(hide);
	};

	const hide = () => {
		setTimeout(instantHide, config.options?.time ?? DEFAULT_TOAST_TIME);
	};

	const instantHide = () => {
		Animated.timing(currentPosition, DEFAULT_HIDE_ANIMATION).start();
		setConfig(DEFAULT_CONFIG);
	};

	const notify = (message: ToastMessage, options?: ToastOptions) => {
		setConfig({ message, options: { ...DEFAULT_CONFIG.options, ...options } });
		show();
	};

	return (
		<ToastContext.Provider
			value={{ currentPosition, config, notify, instantHide }}
		>
			<Toast />
			{children}
		</ToastContext.Provider>
	);
};
