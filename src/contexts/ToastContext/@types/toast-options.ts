import type { IconStyles } from "@/@types/icon-styles";
import type { ToastTypes } from "./toast-types";

export type ToastOptions = {
	type?: ToastTypes;
	time?: number;
	Icon?: (props?: IconStyles) => JSX.Element;
};
