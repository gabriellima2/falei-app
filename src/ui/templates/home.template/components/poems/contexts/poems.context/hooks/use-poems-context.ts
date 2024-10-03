import { useContext } from 'react'
import { PoemsContext } from '../poems.context'

export function usePoemsContext() {
	const context = useContext(PoemsContext)
	return context
}
