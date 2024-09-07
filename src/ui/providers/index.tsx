import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/lib/query-client'

export function Providers(props: PropsWithChildren) {
	const { children } = props
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
