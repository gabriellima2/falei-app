import type { ReactNode } from "react";

import { ToastProvider } from "./ToastContext";

type ProvidersProps = { children: ReactNode };

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return <ToastProvider>{children}</ToastProvider>;
};
