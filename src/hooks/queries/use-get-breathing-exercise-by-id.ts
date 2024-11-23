import { useQuery } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

const breathingExerciseService = makeBreathingExerciseService()

type BreathingExercise = BreathingExerciseEntity | undefined

export function useGetBreathingExerciseById(
	id: string,
	options?: QueryOptions<BreathingExercise>,
) {
	const { data, ...rest } = useQuery<BreathingExercise>({
		queryFn: () => breathingExerciseService.getById(id),
		queryKey: [QUERY_KEYS.GET_BREATHING_EXERCISE, id],
		refetchOnWindowFocus: false,
		...options,
	})
	return { breathingExercise: data, ...rest }
}
