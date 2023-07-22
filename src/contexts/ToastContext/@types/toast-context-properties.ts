import { ToastMessage } from "./toast-message";
import { ToastOptions } from "./toast-options";

export type ToastConfig = {
	message: ToastMessage;
	options?: ToastOptions;
};

export interface ToastContextProperties {
	config: ToastConfig;
	notify: (message: ToastMessage, options?: ToastOptions) => void;
}
