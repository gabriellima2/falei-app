import { createContext } from 'react'
import type { BreathingExercisesContextValues } from './@types/breathing-exercises-context-values'

export const BreathingExercisesContext = createContext<BreathingExercisesContextValues>(
	{} as BreathingExercisesContextValues,
)
