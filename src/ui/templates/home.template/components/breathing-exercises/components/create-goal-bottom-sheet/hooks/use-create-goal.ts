import { useQueryClient } from '@tanstack/react-query'

import { useBreathingExercisesContext } from '../../../contexts/breathing-exercises.context/hooks'
import { useCreateGoalMutation, type CreateGoalParams } from '@/hooks/mutations/use-create-goal'
import { useToast } from '@/hooks/use-toast'

import { QUERY_KEYS } from '@/constants/keys'

type UseCreateGoalReturn = {
	isCreating: boolean
	handleCreate: (params: CreateGoalParams) => void
}

export function useCreateGoal():UseCreateGoalReturn {
	const { handleCloseCreateGoalBottomSheet } = useBreathingExercisesContext()
	const queryClient = useQueryClient()
	const { notify } = useToast()

	const { mutate, isPending } = useCreateGoalMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_PENDING_GOALS],
			})
			notify({ type: 'success', message: 'Meta criada com sucesso!' })
			handleCloseCreateGoalBottomSheet()
		},
		onError: () => {
			notify({
				type: 'error',
				message: 'Não foi possível criar a meta. Por favor, tente novamente.',
			})
		},
	})

	return { isCreating: isPending, handleCreate: mutate }
}
