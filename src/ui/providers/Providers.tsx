import type { ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { DefineReminderBottomSheetProvider } from "@/contexts/DefineReminderBottomSheetContext";
import { ViewReadExerciseProvider } from "@/contexts/ViewReadExerciseContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { MenuProvider } from "@/contexts/MenuContext";

import { queryClient } from "@/lib/query-client";

type ProvidersProps = { children: ReactNode };

export const Providers = (props: ProvidersProps) => {
	const { children } = props;
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<MenuProvider>
					<DefineReminderBottomSheetProvider>
						<ViewReadExerciseProvider>{children}</ViewReadExerciseProvider>
					</DefineReminderBottomSheetProvider>
				</MenuProvider>
			</ToastProvider>
		</QueryClientProvider>
	);
};
