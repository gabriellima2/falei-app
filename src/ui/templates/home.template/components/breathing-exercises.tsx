import { useCallback } from 'react'
import type { ListRenderItemInfo } from 'react-native'

import { BreathingExercise } from '@/ui/components/breathing-exercise'
import { HorizontalList } from '@/ui/components/horizontal-list'
import { Typography } from '@/ui/atoms/typography'

import { useGetAllBreathingExercises } from '@/hooks/http/use-get-all-breathing-exercises'
import { usePush } from '@/hooks/use-push'

import { ROUTES } from '@/constants/routes'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export function BreathingExercises() {
	const push = usePush()
	const { breathingExercises, isLoading, isFetching } = useGetAllBreathingExercises()

	const handleDoBreathingExercise = useCallback((id: string) => {
		push(ROUTES.DO_BREATHING_EXERCISE(id))
	}, [push])

	const keyExtractor = useCallback((item: BreathingExerciseEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<BreathingExerciseEntity>) => (
			<BreathingExercise
				id={item.id}
				title={item.title}
				steps={item.steps}
				roundsTotal={item.roundsTotal}
				onPress={handleDoBreathingExercise}
			/>
		),
		[handleDoBreathingExercise],
	)

	return (
		<HorizontalList
			data={breathingExercises}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<Typography.Label>Loading...</Typography.Label>
					) : (
						<Typography.Label>Empty...</Typography.Label>
					)}
				</>
			)}
		/>
	)
}
