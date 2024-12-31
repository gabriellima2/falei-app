import { createContext } from 'react'
import type { TonguesTwisterContextValues } from './@types/tongues-twister-context-values'

export const TonguesTwisterContext = createContext<TonguesTwisterContextValues>(
	{} as TonguesTwisterContextValues,
)
