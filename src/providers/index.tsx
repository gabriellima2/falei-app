import type { PropsWithChildren } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'

export function Providers(props: PropsWithChildren) {
	const { children } = props
	return (
		<QueryClientProvider client={queryClient}>
			<BottomSheetModalProvider>{children}</BottomSheetModalProvider>
		</QueryClientProvider>
	)
}
