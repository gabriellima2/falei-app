import { createContext } from 'react'
import type { GoalsContextValues } from './@types/goals-context-values'

export const GoalsContext = createContext<GoalsContextValues>(
	{} as GoalsContextValues,
)
