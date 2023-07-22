import { useContext } from "react";
import { ToastContext } from "../ToastContext";

export function useToastContext() {
	return useContext(ToastContext);
}
