import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";

import { theme } from "@/styles/theme";

type WithThemeProviderProps = {
	children: ReactNode;
};

export const WithThemeProvider = (props: WithThemeProviderProps) => {
	const { children } = props;
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
