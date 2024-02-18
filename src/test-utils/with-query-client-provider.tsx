import { type PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";

import { queryClient } from "@/lib/query-client";

type WithQueryClientProviderProps = PropsWithChildren;

export const WithQueryClientProvider = (
	props: WithQueryClientProviderProps
) => (
	<QueryClientProvider client={queryClient}>
		{props.children}
	</QueryClientProvider>
);
