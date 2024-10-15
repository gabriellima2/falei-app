import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNavigation } from '@/hooks/use-navigation'
import { useToast } from '@/hooks/use-toast'

import { makeGoalService } from '@/services/goal.service'

import { QUERY_KEYS } from '@/constants/keys'
import { ROUTES } from '@/constants/routes'

const service = makeGoalService()

export function useSaveGoalProgress(goalId: string) {
	const toast = useToast()
	const navigation = useNavigation()
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: async () => await service.updateProgress(goalId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GOALS] })
			navigation.replace(ROUTES.EXERCISE_COMPLETED)
		},
		onError: () => {
			toast.notify({
				type: 'error',
				message:
					'Não conseguimos salvar o progresso da meta. Por favor, tente novamente.',
			})
			navigation.replace(ROUTES.HOME)
		},
	})

	return {
		handleSaveGoalProgress: mutate,
		isPendingSaveGoalProgress: isPending,
	}
}
