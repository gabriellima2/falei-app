import { useQuery } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

const breathingExerciseService = makeBreathingExerciseService()

type BreathingExercises = BreathingExerciseEntity[] | undefined

export function useGetAllBreathingExercises(
	options?: QueryOptions<BreathingExercises>,
) {
	const { data, ...rest } = useQuery<BreathingExercises>({
		queryFn: breathingExerciseService.getAll,
		queryKey: [QUERY_KEYS.GET_BREATHING_EXERCISES],
		throwOnError: true,
		refetchOnWindowFocus: false,
		...options,
	})
	return { breathingExercises: data, ...rest }
}
