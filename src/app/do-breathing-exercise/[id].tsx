import { Typography } from '@/ui/atoms/typography'
import { useLocalSearchParams } from 'expo-router'

function Page() {
	const { id } = useLocalSearchParams()
	return <Typography.Title>{id as string}</Typography.Title>
}

export default Page
