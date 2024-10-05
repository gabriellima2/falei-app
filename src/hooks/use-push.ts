import { useCallback } from 'react'
import { useRouter, type Href } from 'expo-router'

export function usePush() {
	const router = useRouter()

	const push = useCallback((href: string) => {
		router.push(href as Href<string>)
	}, [router])

	return push
}
