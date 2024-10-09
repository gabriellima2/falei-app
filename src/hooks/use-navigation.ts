import { useCallback } from 'react'
import { useRouter, type Href } from 'expo-router'

export function useNavigation() {
	const router = useRouter()

	const push = useCallback((href: string) => {
		router.push(href as Href<string>)
	}, [router])

	const replace = useCallback((href: string) => {
		router.replace(href as Href<string>)
	}, [router])

	return {
		push,
		replace,
	}
}
