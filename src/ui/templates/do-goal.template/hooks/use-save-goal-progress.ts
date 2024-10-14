import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNavigation } from '@/hooks/use-navigation'

import { makeGoalService } from '@/services/goal.service'

import { QUERY_KEYS } from '@/constants/keys'
import { ROUTES } from '@/constants/routes'

const service = makeGoalService()

export function useSaveGoalProgress(goalId: string) {
	const navigation = useNavigation()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationFn: async () => await service.updateProgress(goalId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_GOALS] })
			navigation.replace(ROUTES.BREATHING_EXERCISE_COMPLETED)
		},
		onError: (err) => {
			console.log(err)
		},
	})
	return {
		handleSaveGoalProgress: mutate,
		isPendingSaveGoalProgress: isPending,
	}
}
