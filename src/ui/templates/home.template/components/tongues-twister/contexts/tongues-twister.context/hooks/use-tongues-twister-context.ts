import { useContext } from 'react'
import { TonguesTwisterContext } from '../tongues-twister.context'

export function useTonguesTwisterContext() {
	const context = useContext(TonguesTwisterContext)
	return context
}
