import type { ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { ToastProvider } from "@/contexts/ToastContext";
import { MenuProvider } from "@/contexts/MenuContext";

import { queryClient } from "@/lib/query-client";

type ProvidersProps = { children: ReactNode };

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return (
		<ToastProvider>
			<MenuProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MenuProvider>
		</ToastProvider>
	);
};
