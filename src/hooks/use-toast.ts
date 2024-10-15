import { useCallback } from 'react'
import { Toast } from 'toastify-react-native'

type NotifyParams = {
	type: 'success' | 'error' | 'warning' | 'info'
	message:string
}

export function useToast() {
	const notify = useCallback((params: NotifyParams) => {
		const { type, message } = params
		switch (type) {
			case 'error':
				Toast.error(message)
				break
			case 'info':
				Toast.info(message)
				break
			case 'success':
				Toast.success(message)
				break
			case 'warning':
				Toast.warn(message)
				break
			default:
				break
		}
	}, [])

	return { notify }
}
