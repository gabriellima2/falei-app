import { createContext } from "react";
import type { ToastContextProperties } from "./@types/toast-context-properties";

export const ToastContext = createContext({} as ToastContextProperties);
