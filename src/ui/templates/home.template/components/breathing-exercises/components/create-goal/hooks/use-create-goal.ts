import { useQueryClient } from '@tanstack/react-query'

import {
	useCreateBreathingExerciseGoalMutation,
	type CreateBreathingExerciseGoalParams,
} from '@/hooks/mutations/use-create-breathing-exercise-goal'
import { useBreathingExercisesContext } from '../../../contexts/breathing-exercises.context/hooks'
import { useToast } from '@/hooks/use-toast'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'
import { QUERY_KEYS } from '@/constants/keys'

type UseCreateGoalReturn = {
	isCreating: boolean
	handleCreate: (params: CreateBreathingExerciseGoalParams) => void
}

export function useCreateGoal():UseCreateGoalReturn {
	const { createGoalBottomSheetRef } = useBreathingExercisesContext()
	const queryClient = useQueryClient()
	const { notify } = useToast()

	const { mutate, isPending } = useCreateBreathingExerciseGoalMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_PENDING_GOALS],
			})
			notify({ type: 'success', message: 'Meta criada com sucesso!' })
			createGoalBottomSheetRef?.current?.close()
		},
		onError: () => {
			notify({
				type: 'error',
				message: DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR,
			})
		},
	})

	return { isCreating: isPending, handleCreate: mutate }
}
