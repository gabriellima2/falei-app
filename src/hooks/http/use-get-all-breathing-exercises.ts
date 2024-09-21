import { useQuery } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const breathingExerciseService = makeBreathingExerciseService()

export function useGetAllBreathingExercises(options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: breathingExerciseService.getAll,
		queryKey: [QUERY_KEYS.GET_BREATHING_EXERCISES],
		...options,
	})
	return { breathingExercises: data, ...rest }
}
