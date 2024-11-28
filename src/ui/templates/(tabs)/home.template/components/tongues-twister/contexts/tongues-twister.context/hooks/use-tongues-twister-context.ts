import { useContext } from 'react'

import { TonguesTwisterContext } from '../tongues-twister.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'

export function useTonguesTwisterContext() {
	const context = useContext(TonguesTwisterContext)
	if (!context) throw new ContextWithoutProviderException(
		'TonguesTwisterContext',
		'TonguesTwisterProvider',
	)
	return context
}
