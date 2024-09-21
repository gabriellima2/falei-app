import { useQuery } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const breathingExerciseService = makeBreathingExerciseService()

export function useGetBreathingExerciseById(
	id: string,
	options?: QueryOptions,
) {
	const { data, ...rest } = useQuery({
		queryFn: () => breathingExerciseService.getById(id),
		queryKey: [QUERY_KEYS.GET_BREATHING_EXERCISE, id],
		...options,
	})
	return { breathingExercise: data, ...rest }
}
