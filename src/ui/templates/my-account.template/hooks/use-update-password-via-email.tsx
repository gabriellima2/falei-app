import { useResetPasswordViaEmail } from '@/hooks/use-reset-password-via-email'
import { useAuthenticationStore } from '@/store/authentication-store'

export function useUpdatePasswordViaEmail() {
	const { sendResetPasswordEmail, ...rest } = useResetPasswordViaEmail()
	const { user } = useAuthenticationStore()

	async function updatePasswordViaEmail() {
		if (!user) return
		sendResetPasswordEmail({ email: user.email })
	}

	return {
		...rest,
		updatePasswordViaEmail,
	}
}
