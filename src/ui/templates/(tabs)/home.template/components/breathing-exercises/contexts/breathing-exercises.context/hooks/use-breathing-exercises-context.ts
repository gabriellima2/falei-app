import { useContext } from 'react'

import { BreathingExercisesContext } from '../breathing-exercises.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'

export function useBreathingExercisesContext() {
	const context = useContext(BreathingExercisesContext)
	if (!context) throw new ContextWithoutProviderException(
		'BreathingExercisesContext',
		'BreathingExercisesProvider',
	)
	return context
}
