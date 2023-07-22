import { ToastTypes } from "./toast-types";

export type ToastOptions = {
	type?: ToastTypes;
	time?: number;
	Icon?: () => JSX.Element;
};
