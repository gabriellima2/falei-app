import { PropsWithChildren } from "react";
import {
	ToastContext,
	type ToastContextProperties,
} from "@/contexts/ToastContext";

export const mockNotify = jest.fn();

export const ToastContextWrapper = ({ children }: PropsWithChildren) => (
	<ToastContext.Provider
		value={{ notify: mockNotify } as unknown as ToastContextProperties}
	>
		{children}
	</ToastContext.Provider>
);
