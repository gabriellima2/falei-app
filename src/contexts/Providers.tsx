import type { ReactNode } from "react";

import { ToastProvider } from "./ToastContext";
import { MenuProvider } from "./MenuContext";

type ProvidersProps = { children: ReactNode };

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return (
		<ToastProvider>
			<MenuProvider>{children}</MenuProvider>
		</ToastProvider>
	);
};
