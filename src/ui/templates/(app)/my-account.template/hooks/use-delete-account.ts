import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

type UseDeleteAccountParams = {
	onSuccess?: () => unknown
}

export function useDeleteAccount(params: UseDeleteAccountParams) {
	const { onSuccess } = params
	const { deleteAccount: deleteAccountAuth } = useAuthenticationStore()
	const { notify } = useToast()

	async function deleteAccount() {
		await deleteAccountAuth()
		notify({ type: 'success', message: 'Conta deletada com sucesso!' })
		onSuccess && (await onSuccess())
	}

	return {
		deleteAccount,
	}
}
