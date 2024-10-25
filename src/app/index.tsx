import { Redirect } from 'expo-router'

function Page() {
	return <Redirect href={{ pathname: '/(auth)/sign-up' }} />
}

export default Page
