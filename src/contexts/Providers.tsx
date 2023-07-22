import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { ToastProvider } from "./ToastContext";
import { theme } from "@/styles/theme";

type ProvidersProps = { children: ReactNode };

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return (
		<ThemeProvider theme={theme}>
			<ToastProvider>{children}</ToastProvider>
		</ThemeProvider>
	);
};
