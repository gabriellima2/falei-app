import { useQueryClient } from '@tanstack/react-query'

import { useDeleteGoalMutation } from '@/hooks/mutations/use-delete-goal'
import { useGoalsContext } from '../../../contexts/goals.context/hooks'
import { useToast } from '@/hooks/use-toast'

import { QUERY_KEYS } from '@/constants/keys'

export function useDeleteGoal() {
	const { handleCloseDeleteGoalBottomSheet } = useGoalsContext()
	const queryClient = useQueryClient()
	const { notify } = useToast()

	const { mutate, isPending } = useDeleteGoalMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_PENDING_GOALS],
			})
			notify({ type: 'success', message: 'Meta deletada com sucesso!' })
			handleCloseDeleteGoalBottomSheet()
		},
		onError: () => {
			notify({
				type: 'error',
				message: 'Não foi possível deletar a meta. Por favor, tente novamente.',
			})
		},
	})

	return { handleDelete: mutate, isDeleting: isPending }
}
