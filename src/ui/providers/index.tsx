import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'

export function Providers(props: PropsWithChildren) {
	const { children } = props
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
