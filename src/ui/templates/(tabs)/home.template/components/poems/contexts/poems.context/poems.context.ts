import { createContext } from 'react'
import type { PoemsContextValues } from './@types/poems-context-values'

export const PoemsContext = createContext<PoemsContextValues>(
	{} as PoemsContextValues,
)
