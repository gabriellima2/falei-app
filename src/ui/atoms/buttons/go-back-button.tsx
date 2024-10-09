import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'

import { Button } from './button'

export function GoBackButton() {
	const router = useRouter()

	const handlePress = useCallback(() => {
		if (router.canGoBack()) {
			router.back()
		}
	}, [router])

	return (
		<Button variant="secondary" size="icon" onPress={handlePress}>
			<ChevronLeft color="#ffffff" />
		</Button>
	)
}
