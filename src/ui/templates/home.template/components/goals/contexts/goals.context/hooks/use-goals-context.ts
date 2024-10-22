import { useContext } from 'react'

import { GoalsContext } from '../goals.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'

export function useGoalsContext() {
	const context = useContext(GoalsContext)
	if (!context) throw new ContextWithoutProviderException(
		'GoalsContext',
		'GoalsProvider',
	)
	return context
}
