import { useState, type ReactNode } from "react";

import { Toast } from "@/components";
import { ToastContext } from "./ToastContext";

import type { ToastOptions } from "./@types/toast-options";
import type { ToastMessage } from "./@types/toast-message";
import type { ToastConfig } from "./@types/toast-context-properties";

type ToastProviderProps = { children: ReactNode };

let timer: NodeJS.Timeout;
const DEFAULT_TOAST_TIME = 2000;
const DEFAULT_CONFIG: ToastConfig = {
	message: null,
	options: {
		type: "default",
		time: DEFAULT_TOAST_TIME,
	},
};

export const ToastProvider = (props: ToastProviderProps) => {
	const { children } = props;
	const [config, setConfig] = useState<ToastConfig>(DEFAULT_CONFIG);

	const notify = (message: ToastMessage, options?: ToastOptions) => {
		setConfig({ message, options: { ...DEFAULT_CONFIG.options, ...options } });
		clearTimeout(timer);
		timer = setTimeout(
			() => setConfig(DEFAULT_CONFIG),
			options?.time ?? DEFAULT_TOAST_TIME
		);
	};

	return (
		<ToastContext.Provider value={{ config, notify }}>
			<Toast />
			{children}
		</ToastContext.Provider>
	);
};
