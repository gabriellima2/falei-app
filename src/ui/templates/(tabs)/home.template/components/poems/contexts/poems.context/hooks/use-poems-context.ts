import { useContext } from 'react'

import { PoemsContext } from '../poems.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'

export function usePoemsContext() {
	const context = useContext(PoemsContext)
	if (!context) throw new ContextWithoutProviderException('PoemsContext', 'PoemsProvider')
	return context
}
